package studiduell.controller;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import studiduell.constants.entity.SpielstatusEntityEnum;
import studiduell.model.KategorieEntity;
import studiduell.model.KategorienfilterEntity;
import studiduell.model.SpielEntity;
import studiduell.model.SpielstatusEntity;
import studiduell.model.UserEntity;
import studiduell.repository.KategorieRepository;
import studiduell.repository.KategorienfilterRepository;
import studiduell.repository.SpielRepository;
import studiduell.repository.UserRepository;
import studiduell.security.CurrentUsername;
import studiduell.security.SecurityContextFacade;

@Controller
@Transactional(rollbackFor=RuntimeException.class)
@RequestMapping(value = "/user")
public class UserController {
	@Value("${user.search.maxSearchableUsers}")
	private int maxSearchableUsers;
	@Value("${user.search.maxEndedGames}")
	private int maxEndedGames;
	@Value("${user.name.conventionsRegex}")
	private String nameConventionsRegex;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private KategorieRepository kategorieRepository;
	@Autowired
	private KategorienfilterRepository kategorienfilterRepository;
	@Autowired
	private SpielRepository spielRepository;
	
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE,
			value = "/checkCredentials/{name}")
	public ResponseEntity<Void> checkCredentials(@PathVariable("name") String name,
			@RequestBody String password) {
		UserEntity userUserEntity = userRepository.findOne(name);
		
		if(userUserEntity != null) {
			String encryptedPwd = DigestUtils.md5DigestAsHex(password.getBytes());
			
			if(userUserEntity.getPasswortHash().equals(encryptedPwd)) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
	}
	
	/**
	 * Runs beyond Spring Security.
	 * 
	 * Takes the username and password.
	 * 
	 * @param user
	 * @return 201/409
	 */
	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.TEXT_PLAIN_VALUE,
					value = "/register/{name}")
	public ResponseEntity<Void> register(@PathVariable("name") String name,
			@RequestBody String password) {
		if(!password.isEmpty()) {
			// password cannot be null because RequestBody is required by default
			if(name.matches(nameConventionsRegex)) {
				// the username has matched the regex
				if(userRepository.findOne(name) == null) {
					// persist user
					UserEntity user = new UserEntity(name);
					String encryptedPassword = DigestUtils.md5DigestAsHex(password.getBytes());
					user.setPasswortHash(encryptedPassword);
					user.setPushId(null);
					user.setLetzteAktivitaet(new Timestamp(System.currentTimeMillis()));
					
					user = userRepository.save(user); // use attached entity. This way, kategorienfilterRepository does not want to save user
					
					// persist user's category settings
					List<KategorieEntity> categories = kategorieRepository.findAll();
					for(KategorieEntity c : categories) {
						KategorienfilterEntity filter = new KategorienfilterEntity(user, c, true);
						kategorienfilterRepository.save(filter);
					}
					//TODO if sth. went wrong: 500 Internal Server Error
					
					return new ResponseEntity<>(HttpStatus.CREATED);
				} else {
					return new ResponseEntity<>(HttpStatus.CONFLICT);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * Takes the push_id.
	 * 
	 * @return 200
	 */
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE, value = "/sync")
	public ResponseEntity<List<SpielEntity>> sync(@RequestBody(required = false) String pushID,
			@CurrentUsername String authUsername) {
		// null check not required as spring security guarantees this code to be executed only for authorized users
		UserEntity userUserEntity = userRepository.findOne(authUsername);
		
		// Save regid for push messaging service - may be null
		userUserEntity.setPushId(pushID);
		// Set last activity to now
		userUserEntity.setLetzteAktivitaet(new Timestamp(System.currentTimeMillis()));
		userRepository.save(userUserEntity);
		
		// Fetch all active and pending games
		List<SpielEntity> games = spielRepository.getWithUserInStatus(userUserEntity,
				Arrays.asList(new SpielstatusEntity[]{SpielstatusEntityEnum.A.getEntity(), SpielstatusEntityEnum.P.getEntity()}));
		
//		// Fetch the last specific amount of CLOSED and ABANDONED (Q) games
		Pageable pageable = new PageRequest(0, maxEndedGames);
		
		Page<SpielEntity> endedGames = spielRepository.getWithUserInStatusOrderBySpielIDDesc(userUserEntity, Arrays.asList(
				new SpielstatusEntity[]{SpielstatusEntityEnum.C.getEntity(), SpielstatusEntityEnum.Q.getEntity()}), pageable);
		games.addAll(endedGames.getContent());
		
		return new ResponseEntity<>(games, HttpStatus.OK);
	}
	
	/**
	 * 
	 * @return 200
	 * @deprecated not implemented
	 */
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE,
			value = "/stats")
	public ResponseEntity<ObjectNode> stats(@CurrentUsername String authUsername) {
		// null check not required as spring security guarantees this code to be executed only for authorized users
		UserEntity userUserEntity = userRepository.findOne(authUsername);
		
		// Fetch stats data
		//TODO
		
		//TODO replace mock
		JsonNodeFactory json = JsonNodeFactory.instance;
		ObjectNode gameObj = json.objectNode();
		gameObj.put("lost", "lostVal");
		gameObj.put("won", "wonVal");
		gameObj.put("draw", "drawVal");
		gameObj.put("total", "totalVal");
		
		ObjectNode questionsObj = json.objectNode();
		questionsObj.put("perc_right", "perc_rightVal");
		questionsObj.put("total", "totalVal");
		
		ObjectNode allObj = json.objectNode();
		allObj.put("game", gameObj);
		allObj.put("questions", questionsObj);
		
		return new ResponseEntity<>(allObj, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE,
			value = "/search/{pattern}") 
	public ResponseEntity<List<String>> search(@PathVariable("pattern") String pattern) {
		Pageable pageRequest = new PageRequest(0, maxSearchableUsers);
		Page<String> page = userRepository.roughSearch("%" + pattern + "%", pageRequest);
		
		return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
	}
}
