package studiduell.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import studiduell.model.FreundeslisteEntity;
import studiduell.model.KategorienfilterEntity;
import studiduell.model.UserEntity;
import studiduell.model.id.FreundeslisteEntityPk;
import studiduell.model.id.KategorienfilterEntityPk;
import studiduell.repository.FreundeslisteRepository;
import studiduell.repository.KategorieRepository;
import studiduell.repository.KategorienfilterRepository;
import studiduell.repository.UserRepository;
import studiduell.security.SecurityContextFacade;

@Controller
@Transactional(rollbackFor = RuntimeException.class)
@RequestMapping(value = "/settings")
public class SettingsController {

	@Autowired
	private UserRepository userRepository; // TODO used?
	@Autowired
	private KategorieRepository kategorieRepository; // TODO used?
	@Autowired
	private KategorienfilterRepository kategorienfilterRepository; // TODO used?
	@Autowired
	private SecurityContextFacade securityContextFacade; // TODO used?
	@Autowired
	private FreundeslisteRepository freundeslisteRepository;

	/**
	 * Takes the category_name and check status.
	 * 
	 * @return 200/406
	 */
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, value = "/updateCategories")
	public ResponseEntity<Void> updateCategories(
			@RequestBody KategorienfilterEntity[] categories) {
		String authUsername = securityContextFacade.getContext()
				.getAuthentication().getName();

		// check whether submitted categories exist
		for (KategorienfilterEntity category : categories) {
			KategorienfilterEntity filterEntity = kategorienfilterRepository
					.findOne(new KategorienfilterEntityPk(authUsername,
							category.getKategorieName()));
			if (filterEntity == null) {
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
			}
		}

		// set categories' status
		for (KategorienfilterEntity category : categories) {
			KategorienfilterEntity filterEntity = kategorienfilterRepository
					.findOne(new KategorienfilterEntityPk(authUsername,
							category.getKategorieName()));
			filterEntity.setKategorieAusgewaehltCheck(category
					.isKategorieAusgewaehltCheck());
			kategorienfilterRepository.save(filterEntity);
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, value = "/friends")
	public ResponseEntity<List<String>> listFriends() {
		String authUsername = securityContextFacade.getContext()
				.getAuthentication().getName();

		List<FreundeslisteEntity> friendRelationships = freundeslisteRepository
				.findByBenutzername(new UserEntity(authUsername));

		List<String> friendNames = new ArrayList<>();
		for (FreundeslisteEntity friendRelationship : friendRelationships) {
			friendNames.add(friendRelationship.getBefreundetMit()
					.getBenutzername());
		}

		return new ResponseEntity<>(friendNames, HttpStatus.OK);
	}

	/**
	 * 
	 * @param friend
	 * @return 201/404/409
	 */
	@RequestMapping(method = RequestMethod.PUT, value = "/friends/{friend}")
	public ResponseEntity<Void> addFriend(@PathVariable("friend") String friend) {
		String authUsername = securityContextFacade.getContext()
				.getAuthentication().getName();

		UserEntity userUserEntity = userRepository.findOne(authUsername), friendUserEntity = userRepository
				.findOne(friend);

		// do I try to be my own friend?
		if (authUsername.equals(friend)) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		// does friend exist?
		if (friendUserEntity == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		// already befriended?
		if (freundeslisteRepository.findOne(new FreundeslisteEntityPk(
				authUsername, friend)) != null) { // exists does not work here
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

		FreundeslisteEntity friends = new FreundeslisteEntity(userUserEntity,
				friendUserEntity);
		freundeslisteRepository.save(friends);

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/friends/{friend}")
	public ResponseEntity<Void> deleteFriend(
			@PathVariable("friend") String friend) {
		// TODO maybe implement
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
	}
}
