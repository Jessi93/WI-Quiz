package studiduell.model;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name = "Spiel")
public class SpielEntity {
	
	public SpielEntity() {
	}

	public SpielEntity(int spielID, SpieltypEntity spieltypName,
			UserEntity spieler1, UserEntity spieler2, UserEntity sieger,
			UserEntity verlierer, UserEntity wartenAuf, int aktuelleRunde,
			SpielstatusEntity spielstatusName, Timestamp letzteAktivitaet) {
		//XXX constructor
		this.spielID = spielID;
		this.spieltypName = spieltypName;
		this.spieler1 = spieler1;
		this.spieler2 = spieler2;
		this.sieger = sieger;
		this.verlierer = verlierer;
		this.wartenAuf = wartenAuf;
		this.aktuelleRunde = aktuelleRunde;
		this.spielstatusName = spielstatusName;
		this.letzteAktivitaet = letzteAktivitaet;
	}
	
	@Id
	@GeneratedValue
	@JoinColumn(name = "spielID", unique = true, nullable = false)
	private int spielID;
	
	@JoinColumn(name = "spieltypName", nullable = false, referencedColumnName = "name")
	@OneToOne
	private SpieltypEntity spieltypName;
	
	@JoinColumn(name = "spieler1", nullable = false, referencedColumnName = "benutzername")
	@OneToOne
	private UserEntity spieler1;
	
	@JoinColumn(name = "spieler2", nullable = false, referencedColumnName = "benutzername")
	@OneToOne
	private UserEntity spieler2;
	
	@JoinColumn(name = "sieger", referencedColumnName = "benutzername")
	@OneToOne
	private UserEntity sieger;
	
	@JoinColumn(name = "verlierer", referencedColumnName = "benutzername")
	@OneToOne
	private UserEntity verlierer;
	
	@JoinColumn(name = "wartenAuf", referencedColumnName = "benutzername")
	@OneToOne
	private UserEntity wartenAuf;
	
	@Column(name = "aktuelleRunde", nullable = false)
	private int aktuelleRunde;
	
	@JoinColumn(name = "spielstatusName", nullable = false, referencedColumnName = "name")
	@OneToOne
	private SpielstatusEntity spielstatusName;
	
	@Column(name = "letzteAktivitaet", nullable = false)
	private Timestamp letzteAktivitaet;
	
	// relationships
	@JsonIgnore
	@OneToMany(mappedBy = "spiel")
	private List<RundeEntity> runden;

	public int getSpielID() {
		return spielID;
	}

	public void setSpielID(int spielID) {
		this.spielID = spielID;
	}

	public SpieltypEntity getSpieltypName() {
		return spieltypName;
	}

	public void setSpieltypName(SpieltypEntity spieltypName) {
		this.spieltypName = spieltypName;
	}

	public UserEntity getSpieler1() {
		return spieler1;
	}

	public void setSpieler1(UserEntity spieler1) {
		this.spieler1 = spieler1;
	}

	public UserEntity getSpieler2() {
		return spieler2;
	}

	public void setSpieler2(UserEntity spieler2) {
		this.spieler2 = spieler2;
	}

	public UserEntity getSieger() {
		return sieger;
	}

	public void setSieger(UserEntity sieger) {
		this.sieger = sieger;
	}

	public UserEntity getVerlierer() {
		return verlierer;
	}

	public void setVerlierer(UserEntity verlierer) {
		this.verlierer = verlierer;
	}

	public UserEntity getWartenAuf() {
		return wartenAuf;
	}

	public void setWartenAuf(UserEntity wartenAuf) {
		this.wartenAuf = wartenAuf;
	}

	public int getAktuelleRunde() {
		return aktuelleRunde;
	}

	public void setAktuelleRunde(int aktuelleRunde) {
		this.aktuelleRunde = aktuelleRunde;
	}

	public SpielstatusEntity getSpielstatusName() {
		return spielstatusName;
	}

	public void setSpielstatusName(SpielstatusEntity spielstatusName) {
		this.spielstatusName = spielstatusName;
	}

	public Timestamp getLetzteAktivitaet() {
		return letzteAktivitaet;
	}

	public void setLetzteAktivitaet(Timestamp letzteAktivitaet) {
		this.letzteAktivitaet = letzteAktivitaet;
	}
	
	public List<RundeEntity> getRunden() {
		return runden;
	}
}
