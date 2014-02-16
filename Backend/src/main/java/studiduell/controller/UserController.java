package studiduell.controller;

import java.sql.Timestamp;
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


	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.TEXT_PLAIN_VALUE, value = "/register")
	public ResponseEntity<String> register(@RequestBody UserEntity user) {
		if(userRepository.findOne(user.getBenutzername()) == null) {
			// persist user
			String encryptedPassword = DigestUtils.md5DigestAsHex(user.getPasswort_hash().getBytes());
			user.setPasswort_hash(encryptedPassword);
			user.setLetzteAktivitaet(new Timestamp(System.currentTimeMillis()));
			
			userRepository.save(user);
			
			// persist user's category settings
			//TODO
			List<KategorieEntity> categories = kategorieRepository.findAll();
			for(KategorieEntity c : categories) {
				KategorienfilterEntity filter = new KategorienfilterEntity(user.getBenutzername(), c.getName(), true);
				kategorienfilterRepository.save(filter);
			}
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
}
