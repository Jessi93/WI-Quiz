package studiduell.controller;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import studiduell.constants.entity.SpielstatusEntityEnum;
import studiduell.constants.entity.SpieltypEntityEnum;
import studiduell.constants.httpheader.HttpHeaderDefaults;
import studiduell.model.AntwortEntity;
import studiduell.model.FrageEntity;
import studiduell.model.KategorieEntity;
import studiduell.model.KategorienfilterEntity;
import studiduell.model.RundeEntity;
import studiduell.model.SpielEntity;
import studiduell.model.SpielstatusEntity;
import studiduell.model.SpieltypEntity;
import studiduell.model.UserEntity;
import studiduell.repository.AntwortRepository;
import studiduell.repository.FrageRepository;
import studiduell.repository.KategorienfilterRepository;
import studiduell.repository.RundeRepository;
import studiduell.repository.SpielRepository;
import studiduell.repository.UserRepository;
import studiduell.security.SecurityContextFacade;

@Controller
@Transactional(rollbackFor=RuntimeException.class)
@RequestMapping(value = "/game")
public class SpielController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SpielRepository spielRepository;
	@Autowired
	private RundeRepository rundeRepository;
	@Autowired
	private AntwortRepository antwortRepository;
	@Autowired
	private FrageRepository frageRepository;
	@Autowired
	private KategorienfilterRepository kategorienfilterRepository;
	@Autowired
	private SecurityContextFacade securityContextFacade;
	@Autowired
	private HttpHeaderDefaults httpHeaderDefaults;
	
	private Random random = new Random();
	
	@Value("${game.calendar.userActivityTimeout.field}")
	private int calendarField;
	@Value("${game.calendar.userActivityTimeout.offset}")
	private int calendarOffset;
	@Value("${game.maxRounds}")
	private int maxRounds;
	
	@Value("${game.suggestedCategoriesCount}")
	private int suggestedCategoriesCount;
	@Value("${game.questionsPerRound}")
	private int questionsPerRound;
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE,
			value = "/create/random")
	public ResponseEntity<String> createRandom() {
		// TODO logic: regard user that also wants to play (MEETING FOR DB-CLARIFICATION!) - regard user with same category intersections - no regard of time?
		String authUsername = securityContextFacade.getContext().getAuthentication().getName();
		UserEntity userUserEntity = userRepository.findOne(authUsername);
		
		// select opponent
		Calendar activityAfter = Calendar.getInstance();
		activityAfter.add(calendarField, calendarOffset);
		List<UserEntity> users = userRepository.findOthersActiveAfter(authUsername, new Timestamp(activityAfter.getTimeInMillis()));
		//TODO and no running game with that user
		
		if(!users.isEmpty()) {
			UserEntity opponentUserEntity = users.get(random.nextInt(users.size()));
			
			SpielEntity game = createGame(userUserEntity, opponentUserEntity,
					SpieltypEntityEnum.M.getEntity(), SpielstatusEntityEnum.P.getEntity());
			spielRepository.save(game);
			
			//TODO Push notification for opponent here
			
			return new ResponseEntity<>(opponentUserEntity.getBenutzername(), httpHeaderDefaults.getAccessControlAllowOriginHeader(),
					HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/create/with/{opponent}")
	public synchronized ResponseEntity<Void> create(@PathVariable("opponent") String opponent) {
		UserEntity userUserEntity = userRepository.findOne(
				securityContextFacade.getContext().getAuthentication().getName());
		UserEntity opponentUserEntity = userRepository.findOne(opponent);
		
		if(opponentUserEntity != null) {
			// do I challenge myself?
			// does an active game with the opponent exist at the time?
			if(!userUserEntity.getBenutzername().equals(opponent)
					&& spielRepository.getWithUserAndOpponentInStatus(userUserEntity,
					opponentUserEntity,
					Arrays.asList(new SpielstatusEntity[] {SpielstatusEntityEnum.A.getEntity(), SpielstatusEntityEnum.P.getEntity()})) == 0) {
				// do we have at least three categories in common
				Set<KategorienfilterEntity> commonCategories = kategorienfilterRepository.commonCategories(userUserEntity, opponentUserEntity);
				if(commonCategories.size() >= suggestedCategoriesCount) {
					SpielEntity game = createGame(userUserEntity, opponentUserEntity,
							SpieltypEntityEnum.M.getEntity(), SpielstatusEntityEnum.P.getEntity());
					spielRepository.save(game);
					return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.CREATED);
				} else {
					return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_ACCEPTABLE);
				}
			} else {
				return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.CONFLICT);
			}
		} else {
			return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE,
			value = "/overview/{gameID}")
	public ResponseEntity<ObjectNode> gameOverview(@PathVariable("gameID") Integer gameID) {
		SpielEntity spielEntity = spielRepository.findOne(gameID);
		
		if(spielEntity != null) {
			List<RundeEntity> rounds = spielEntity.getRunden();
			
			ObjectNode json = JsonNodeFactory.instance.objectNode();
			
			// rounds - answers - questions
			ArrayNode roundsArray = JsonNodeFactory.instance.arrayNode();
			for(RundeEntity e : rounds) {
				roundsArray.addPOJO(e);
			}
			
			json.putPOJO("rounds", roundsArray);
			
			return new ResponseEntity<>(json, httpHeaderDefaults.getAccessControlAllowOriginHeader(),
					HttpStatus.OK);
		} else {
			return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE,
			value = "/answerInvite/{gameID}")
	public ResponseEntity<Void> answerInvite(@PathVariable("gameID") Integer gameID, @RequestBody String flag) {
		String authUsername = securityContextFacade.getContext().getAuthentication().getName();
		
		boolean flagVal;
		
		if (flag.equalsIgnoreCase("true")) {
			flagVal = true;
		} else if (flag.equalsIgnoreCase("false")) {
			flagVal = false;
		} else {
			return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_ACCEPTABLE);
		}
		// TODO LOW: If server breaks down before commit, the roundID is
		// incremented, too. Prevent that?
		SpielEntity gameSpielEntity = spielRepository.findOne(gameID);
		if (gameSpielEntity != null) {
			// only accept invite if it is a pending game whose player 2 is this
			// user
			if (gameSpielEntity.getSpieler2().getBenutzername()
					.equals(authUsername)
					&& gameSpielEntity.getSpielstatusName().getName() == SpielstatusEntityEnum.P
							.getEntity().getName()) {

				if (flagVal) {
					// accept challenge
					gameSpielEntity.setSpielstatusName(SpielstatusEntityEnum.A
							.getEntity());

					// create rounds
					createRounds(gameSpielEntity);
				} else {
					// decline challenge
					gameSpielEntity.setSpielstatusName(SpielstatusEntityEnum.D
							.getEntity());
				}
				// set last activity to now
				gameSpielEntity.setLetzteAktivitaet(new Timestamp(System.currentTimeMillis()));
				
				spielRepository.save(gameSpielEntity);

				return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.OK);
			}
			return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_ACCEPTABLE);
		}

		return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,
			value = "/randomCategoriesFor/{gameID}") //TODO GET instead of POST
	public ResponseEntity<ArrayNode> randomCategories(@PathVariable("gameID") Integer gameID) {
		String authUsername = securityContextFacade.getContext().getAuthentication().getName();
		//TODO test method
		SpielEntity gameSpielEntity = spielRepository.findOne(gameID);
		UserEntity userUserEntity = userRepository.findOne(authUsername);
		UserEntity opponentUserEntity = gameSpielEntity.getSpieler1().equals(userUserEntity) ? gameSpielEntity.getSpieler2() : gameSpielEntity.getSpieler1();
		
		if(userUserEntity.equals(gameSpielEntity.getSpieler1()) || userUserEntity.equals(gameSpielEntity.getSpieler2())) {
			Set<KategorienfilterEntity> commonCategories = kategorienfilterRepository.commonCategories(userUserEntity, opponentUserEntity);
			if(commonCategories.size() >= suggestedCategoriesCount) {
				// the certain amount of common categories exists
				
				ArrayNode json = JsonNodeFactory.instance.arrayNode();
				
				Set<KategorieEntity> categories = randomCommonCategoryIntersection(commonCategories, suggestedCategoriesCount);
				Iterator<KategorieEntity> categoryIterator = categories.iterator();
				while(categoryIterator.hasNext()) {
					// create an array entry for each selected category
					ObjectNode currEntryNode = JsonNodeFactory.instance.objectNode();
					KategorieEntity currCategory = categoryIterator.next();
					
					Set<FrageEntity> questions = randomQuestionsByCategory(currCategory, questionsPerRound);
					ArrayNode questionsArrayNode = JsonNodeFactory.instance.arrayNode();
					for(FrageEntity question : (FrageEntity[]) questions.toArray()) {
						questionsArrayNode.addPOJO(question);
					}
					
					currEntryNode.put("categoryName", currCategory.getName());
					currEntryNode.put("questions", questionsArrayNode);
					
					json.add(currEntryNode);
				}
				
				return new ResponseEntity<ArrayNode>(json, httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.OK);
			} else {
				// less than a certain amount of common categories
				return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.GONE);
			}
		} else {
			// any user requested questions for a game he does not play in
			return new ResponseEntity<>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.FORBIDDEN);
		}
		//TODO Mock
		/*
		ArrayNode json = JsonNodeFactory.instance.arrayNode();
		
		FrageEntity frage1 = new FrageEntity(1, "Logik und Algebra","uk", false, "Frage 1","A","B","C","D",false,false,false,true,true);
		FrageEntity frage2 = new FrageEntity(2, "Logik und Algebra","uk", false, "Frage 2","A","B","C","D",false,false,false,true,true);
		FrageEntity frage3 = new FrageEntity(3, "Logik und Algebra","uk2", false, "Frage 3","A","B","C","D",false,false,false,true,true);
		ArrayNode cat1 = JsonNodeFactory.instance.arrayNode();
		cat1.addPOJO(frage1);
		cat1.addPOJO(frage2);
		cat1.addPOJO(frage3);
		
		FrageEntity frage4 = new FrageEntity(4, "Methoden der Wirtschaftsinformatik","uk", false, "Frage 4","A","B","C","D",false,false,false,true,true);
		FrageEntity frage5 = new FrageEntity(5, "Methoden der Wirtschaftsinformatik","uk", false, "Frage 5","A","B","C","D",false,false,false,true,true);
		FrageEntity frage6 = new FrageEntity(6, "Methoden der Wirtschaftsinformatik","uk2", false, "Frage 6","A","B","C","D",false,false,false,true,true);
		ArrayNode cat2 = JsonNodeFactory.instance.arrayNode();
		cat2.addPOJO(frage4);
		cat2.addPOJO(frage5);
		cat2.addPOJO(frage6);
		XXX
		FrageEntity frage7 = new FrageEntity(7, "Verteilte Systeme","uk", false, "Frage 7","A","B","C","D",false,false,false,true,true);
		FrageEntity frage8 = new FrageEntity(8, "Verteilte Systeme","uk", false, "Frage 8","A","B","C","D",false,false,false,true,true);
		FrageEntity frage9 = new FrageEntity(9, "Verteilte Systeme","uk2", false, "Frage 9","A","B","C","D",false,false,false,true,true);
		ArrayNode cat3 = JsonNodeFactory.instance.arrayNode();
		cat3.addPOJO(frage7);
		cat3.addPOJO(frage8);
		cat3.addPOJO(frage9);
		
		ObjectNode obj1 = JsonNodeFactory.instance.objectNode();
		obj1.put("categoryName", "Logik und Algebra");
		obj1.put("questions", cat1);
		
		ObjectNode obj2 = JsonNodeFactory.instance.objectNode();
		obj2.put("categoryName", "Methoden der Wirtschaftsinformatik");
		obj2.put("questions", cat2);
		
		ObjectNode obj3 = JsonNodeFactory.instance.objectNode();
		obj3.put("categoryName", "Verteilte Systeme");
		obj3.put("questions", cat3);
		
		json.add(obj1);
		json.add(obj2);
		json.add(obj3);
		
		return new ResponseEntity<>(json, httpHeaderDefaults.getAccessControlAllowOriginHeader(),
				HttpStatus.OK);
		*/
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE,
			value = "/continueRound/{gameID}")
	public ResponseEntity<ObjectNode> continueRound(@PathVariable("gameID") String gameID) {
		
		//TODO Mock
		
		ObjectNode obj = JsonNodeFactory.instance.objectNode();
		
		FrageEntity frage1 = new FrageEntity(7, new KategorieEntity("Verteilte Systeme"),"uk", false, "Frage 7","A","B","C","D",false,false,false,true,true);
		FrageEntity frage2 = new FrageEntity(8, new KategorieEntity("Verteilte Systeme"),"uk", false, "Frage 8","A","B","C","D",false,false,false,true,true);
		FrageEntity frage3 = new FrageEntity(9, new KategorieEntity("Verteilte Systeme"),"uk2", false, "Frage 9","A","B","C","D",false,false,false,true,true);
		
		ArrayNode arr1 = JsonNodeFactory.instance.arrayNode();
		arr1.addPOJO(frage1);
		arr1.addPOJO(frage2);
		arr1.addPOJO(frage3);
		
		RundeEntity r = new RundeEntity();
		r.setRundenID(21);
		
		UserEntity user = userRepository.findOne("Kevin01");
		AntwortEntity ans1 = new AntwortEntity(frageRepository.findOne(7), r, user, false, false, false, true, true, true);
		AntwortEntity ans2 = new AntwortEntity(frageRepository.findOne(8), r, user, false, false, false, true, true, true);
		AntwortEntity ans3 = new AntwortEntity(frageRepository.findOne(9), r, user, false, false, false, true, true, true);
		
		ArrayNode arr2 = JsonNodeFactory.instance.arrayNode();
		arr2.addPOJO(ans1);
		arr2.addPOJO(ans2);
		arr2.addPOJO(ans3);
		
		obj.put("questions", arr1);
		obj.put("answers", arr2);
		
		return new ResponseEntity<>(obj, httpHeaderDefaults.getAccessControlAllowOriginHeader(),
				HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
			value = "/submitRoundResult")
	public ResponseEntity<Void> submitRoundResult(@RequestBody AntwortEntity answer) {
		return new ResponseEntity<Void>(httpHeaderDefaults.getAccessControlAllowOriginHeader(), HttpStatus.NOT_IMPLEMENTED);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/abandon/{gameID}")
	public ResponseEntity<Void> abandon(@PathVariable("gameID") Integer gameID) {
		SpielEntity gameSpielEntity = spielRepository.findOne(gameID);
		
		if(gameSpielEntity != null) {
			SpielstatusEntity gameState = gameSpielEntity.getSpielstatusName();
			if(SpielstatusEntityEnum.A.getEntity().equals(gameState)
					|| SpielstatusEntityEnum.P.getEntity().equals(gameState)) {
				
				gameSpielEntity.setSpielstatusName(SpielstatusEntityEnum.Q.getEntity());
				spielRepository.save(gameSpielEntity);
				
				return new ResponseEntity<Void>(httpHeaderDefaults.getAccessControlAllowOriginHeader(),
						HttpStatus.OK); 
			} else {
				// only active and pending games can be abandoned
				return new ResponseEntity<Void>(httpHeaderDefaults.getAccessControlAllowOriginHeader(),
						HttpStatus.NOT_ACCEPTABLE);
			}
		} else {
			// no such game found
			return new ResponseEntity<Void>(httpHeaderDefaults.getAccessControlAllowOriginHeader(),
					HttpStatus.NOT_FOUND);
		}
	}
	
	private SpielEntity createGame(UserEntity user, UserEntity opponent, SpieltypEntity type, SpielstatusEntity status) {
		SpielEntity game = new SpielEntity();
		game.setSpieltypName(type);
		game.setSpieler1(user);
		game.setSpieler2(opponent);
		game.setWartenAuf(opponent);
		game.setAktuelleRunde(1);
		game.setSpielstatusName(status);
		game.setLetzteAktivitaet(new Timestamp(System.currentTimeMillis()));
		
		return game;
	}
	
	private void createRounds(SpielEntity spielEntity) {
		for(int i = 1; i <= maxRounds; i++) {
			RundeEntity round = new RundeEntity(spielEntity, i);
			rundeRepository.save(round);
		}
	}
	
	/**
	 * Returns a random intersection of common categories. The set's size
	 * is <code>amount</code>.
	 * 
	 * @param categoryFilter the category filters.
	 * @param amount the amount of randomly selected common categories
	 * @return the randomly selected common categories
	 */
	private Set<KategorieEntity> randomCommonCategoryIntersection(Set<KategorienfilterEntity> categoryFilter, int amount) {
		Set<KategorieEntity> categories = new HashSet<>(amount);
		
		Object[] tmpKategorienfilterEntities = categoryFilter.toArray();
		while(categories.size() < amount) {
			int randomIndex = random.nextInt(amount);
			categories.add(((KategorienfilterEntity) tmpKategorienfilterEntities[randomIndex]).getKategorieName());
		}
		
		return categories;
	}
	
	private Set<FrageEntity> randomQuestionsByCategory(KategorieEntity category, int questionCount) {
		Set<FrageEntity> questions = frageRepository.findByKategorieName(category);
		Set<FrageEntity> returnQuestions = new HashSet<>();
		
		Object[] tmpQuestions = questions.toArray();
		while(returnQuestions.size() < questionCount) {
			int randomIndex = random.nextInt(tmpQuestions.length);
			returnQuestions.add((FrageEntity) tmpQuestions[randomIndex]);
		}
		
		return returnQuestions;
	}
}

//TODO @Transactional use timeout
//TODO synchronized? multiple equal games are created instead of only one. Everywhere or nowhere!