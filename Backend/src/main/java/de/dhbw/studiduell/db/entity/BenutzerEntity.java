package de.dhbw.studiduell.db.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Benutzer")
public class BenutzerEntity {
	@Id
	private String benutzername;
	
	private byte[] passwort_hash;
	
	private String push_id;
	
	private Timestamp letzteAktivitaet;

	
	public BenutzerEntity() {}
	
	/**
	 * Creates a new user entity with the
	 * unique name.
	 * 
	 * @param benutzername the name
	 */
	public BenutzerEntity(String benutzername) {
		this.benutzername = benutzername;
	}
	
	public BenutzerEntity(String benutzername, byte[] passwort_hash,
			Timestamp letzteAktivitaet) {
		super();
		this.benutzername = benutzername;
		this.passwort_hash = passwort_hash;
		this.letzteAktivitaet = letzteAktivitaet;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public byte[] getPasswort_hash() {
		return passwort_hash;
	}

	public void setPasswort_hash(byte[] passwort_hash) {
		this.passwort_hash = passwort_hash;
	}

	public String getPush_id() {
		return push_id;
	}

	public void setPush_id(String push_id) {
		this.push_id = push_id;
	}

	public Timestamp getLetzteAktivitaet() {
		return letzteAktivitaet;
	}

	public void setLetzteAktivitaet(Timestamp letzteAktivitaet) {
		this.letzteAktivitaet = letzteAktivitaet;
	}
}
