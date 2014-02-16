package studiduell.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "spiel")
public class SpielEntity {
	
	public SpielEntity() {
	}

	public SpielEntity(int spielID, char spieltyp_name, String spieler1,
			String spieler2, String sieger, String verlierer, String wartenAuf,
			int aktuelleRunde, char spielstatus_name, Timestamp letzteAktivitaet) {
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
	@Column(name = "spielID", unique = true, nullable = false)
	private int spielID;
	
	@Column(name = "spieltyp_name", nullable = false)
	private char spieltyp_name;
	
	@Column(name = "spieler1", nullable = false)
	private String spieler1;
	
	@Column(name = "spieler2", nullable = false)
	private String spieler2;
	
	@Column(name = "sieger")
	private String sieger;
	
	@Column(name = "verlierer")
	private String verlierer;
	
	@Column(name = "wartenAuf", nullable = false)
	private String wartenAuf;
	
	@Column(name = "aktuelleRunde", nullable = false)
	private int aktuelleRunde;
	
	@Column(name = "spielstatus_name", nullable = false)
	private char spielstatus_name;
	
	@Column(name = "letzteAktivitaet", nullable = false)
	private Timestamp letzteAktivitaet;

	public int getSpielID() {
		return spielID;
	}

	public void setSpielID(int spielID) {
		this.spielID = spielID;
	}

	public char getSpieltyp_name() {
		return spieltyp_name;
	}

	public void setSpieltyp_name(char spieltyp_name) {
		this.spieltyp_name = spieltyp_name;
	}

	public String getSpieler1() {
		return spieler1;
	}

	public void setSpieler1(String spieler1) {
		this.spieler1 = spieler1;
	}

	public String getSpieler2() {
		return spieler2;
	}

	public void setSpieler2(String spieler2) {
		this.spieler2 = spieler2;
	}

	public String getSieger() {
		return sieger;
	}

	public void setSieger(String sieger) {
		this.sieger = sieger;
	}

	public String getVerlierer() {
		return verlierer;
	}

	public void setVerlierer(String verlierer) {
		this.verlierer = verlierer;
	}

	public String getWartenAuf() {
		return wartenAuf;
	}

	public void setWartenAuf(String wartenAuf) {
		this.wartenAuf = wartenAuf;
	}

	public int getAktuelleRunde() {
		return aktuelleRunde;
	}

	public void setAktuelleRunde(int aktuelleRunde) {
		this.aktuelleRunde = aktuelleRunde;
	}

	public char getSpielstatus_name() {
		return spielstatus_name;
	}

	public void setSpielstatus_name(char spielstatus_name) {
		this.spielstatus_name = spielstatus_name;
	}

	public Timestamp getLetzteAktivitaet() {
		return letzteAktivitaet;
	}

	public void setLetzteAktivitaet(Timestamp letzteAktivitaet) {
		this.letzteAktivitaet = letzteAktivitaet;
	}
}
