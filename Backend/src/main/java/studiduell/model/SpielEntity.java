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

	public SpielEntity(int spielID, SpieltypEntity spieltyp_name,
			UserEntity spieler1, UserEntity spieler2, UserEntity sieger,
			UserEntity verlierer, UserEntity wartenAuf, int aktuelleRunde,
			SpielstatusEntity spielstatus_name, Timestamp letzteAktivitaet) {
		//XXX constructor
		this.spielID = spielID;
		this.spieltyp_name = spieltyp_name;
		this.spieler1 = spieler1;
		this.spieler2 = spieler2;
		this.sieger = sieger;
		this.verlierer = verlierer;
		this.wartenAuf = wartenAuf;
		this.aktuelleRunde = aktuelleRunde;
		this.spielstatus_name = spielstatus_name;
		this.letzteAktivitaet = letzteAktivitaet;
	}
	
	@Id
	@GeneratedValue
	@JoinColumn(name = "spielID", unique = true, nullable = false)
	private int spielID;
	
	@JoinColumn(name = "spieltyp_name", nullable = false, referencedColumnName = "name")
	@OneToOne
	private SpieltypEntity spieltyp_name;
	
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
	
	@JoinColumn(name = "wartenAuf", nullable = false, referencedColumnName = "benutzername")
	@OneToOne
	private UserEntity wartenAuf;
	
	@Column(name = "aktuelleRunde", nullable = false)
	private int aktuelleRunde;
	
	@JoinColumn(name = "spielstatus_name", nullable = false, referencedColumnName = "name")
	@OneToOne
	private SpielstatusEntity spielstatus_name;
	
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

	public SpieltypEntity getSpieltyp_name() {
		return spieltyp_name;
	}

	public void setSpieltyp_name(SpieltypEntity spieltyp_name) {
		this.spieltyp_name = spieltyp_name;
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

	public SpielstatusEntity getSpielstatus_name() {
		return spielstatus_name;
	}

	public void setSpielstatus_name(SpielstatusEntity spielstatus_name) {
		this.spielstatus_name = spielstatus_name;
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
