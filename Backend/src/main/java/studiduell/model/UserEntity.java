package studiduell.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "benutzer")
public class UserEntity {
	@Id
	@Column(name = "benutzername", unique = true, nullable = false)
	private String benutzername;
	
	@Column(name = "passwort_hash", nullable = false)
	private String passwort_hash;
	
	@Column(name = "push_id")
	private String push_id;
	
	@Column(name = "letzteAktivitaet", nullable = false)
	private Timestamp letzteAktivitaet;

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getPasswort_hash() {
		return passwort_hash;
	}

	public void setPasswort_hash(String passwort_hash) {
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
