package studiduell.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import studiduell.exc.StudiduellRuntimeException;
import studiduell.model.KategorieEntity;
import studiduell.model.KategorienfilterEntity;
import studiduell.model.SpielEntity;
import studiduell.model.UserEntity;
import studiduell.repository.KategorieRepository;
import studiduell.repository.KategorienfilterRepository;
import studiduell.repository.UserRepository;
import studiduell.security.SecurityContextFacade;

@Controller
@Transactional(rollbackFor=StudiduellRuntimeException.class)
@RequestMapping(value = "/user")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private KategorieRepository kategorieRepository;
	@Autowired
	private KategorienfilterRepository kategorienfilterRepository;
	@Autowired
	private SecurityContextFacade securityContextFacade;


	/**
	 * Takes the username and password.
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.TEXT_PLAIN_VALUE, value = "/register")
	public ResponseEntity<Void> register(@RequestBody UserEntity user) {
		if(userRepository.findOne(user.getBenutzername()) == null) {
			// persist user
			String encryptedPassword = DigestUtils.md5DigestAsHex(user.getPasswort_hash().getBytes());
			user.setPasswort_hash(encryptedPassword);
			user.setLetzteAktivitaet(new Timestamp(System.currentTimeMillis()));
			
			userRepository.save(user);
			
			// persist user's category settings
			List<KategorieEntity> categories = kategorieRepository.findAll();
			for(KategorieEntity c : categories) {
				KategorienfilterEntity filter = new KategorienfilterEntity(user.getBenutzername(), c.getName(), true);
				kategorienfilterRepository.save(filter);
			}
			//TODO if sth. went wrong: 500 Internal Server Error
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	/**
	 * Takes the username and push_id.
	 * 
	 * @param benutzername
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE, value = "/sync")
	public ResponseEntity<List<SpielEntity>> sync(@RequestBody UserEntity user) {
		UserEntity dbUser = userRepository.findOne(user.getBenutzername());
		String authUsername = securityContextFacade.getContext().getAuthentication().getName();
		
		if(dbUser == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		if(!user.getBenutzername().equals(authUsername))
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		
		// Save regid for push messaging service
		dbUser.setPush_id(user.getPush_id());
		userRepository.save(dbUser);
		
		// Fetch all active games
		//TODO
		
		//TODO replace mock
		List<SpielEntity> mockSpiele = new ArrayList<>();
		mockSpiele.add(new SpielEntity(1, 'M', "spieler1", "spieler2", "sieger", "verlierer", "wartenAuf", 2, 'P', new Timestamp(System.currentTimeMillis())));
		mockSpiele.add(new SpielEntity(2, 'S', null, null, null, null, null, 0, ' ', new Timestamp(System.currentTimeMillis())));
		mockSpiele.add(new SpielEntity(3, 'M', "spieler1", "spieler2", "sieger", "verlierer", "wartenAuf", 2, 'P', new Timestamp(System.currentTimeMillis())));
		
		return new ResponseEntity<>(mockSpiele, HttpStatus.OK);
	}
}
