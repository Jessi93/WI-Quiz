package de.dhbw.hash;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.annotation.PostConstruct;

import com.sun.jersey.api.core.InjectParam;
import com.sun.jersey.spi.resource.Singleton;

import de.dhbw.exc.StudiduellRuntimeException;
import de.dhbw.props.StudiduellProps;

@Singleton
public class PasswordHash {
	@InjectParam
	private StudiduellProps props;
	
	private MessageDigest messageDigest;
	
	/**
	 * Inits the message digester with the
	 * algorithm specified in Studiduell's
	 * properties file.
	 */
	@PostConstruct
	public void init() {
		try {
			messageDigest = MessageDigest.getInstance(props.get("crypto.algorithm"));
		} catch(NoSuchAlgorithmException ex) {
			throw new StudiduellRuntimeException(ex);
		}
	}
	
	/**
	 * Hashes a password and returns the hashed
	 * result. The used algorithm is set in
	 * Studiduell's properties file.
	 * 
	 * @param password the password to hash
	 * @return the hashed value
	 */
	public byte[] hash(byte[] password) {
		return messageDigest.digest(password);
	}
}
