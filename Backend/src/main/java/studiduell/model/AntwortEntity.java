package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import studiduell.model.id.AntwortEntityPk;

@Entity
@IdClass(AntwortEntityPk.class)
@Table(name = "Antwort")
public class AntwortEntity {
	
	@Id
	@ManyToOne
	@JoinColumn(name = "fragenID", nullable = false, referencedColumnName = "fragenID")
	private FrageEntity frage;
	
	@JsonIgnore
	@Id
	@JoinColumn(name = "rundenID", nullable = false)
	@ManyToOne
	private RundeEntity rundenID;
	
	@Id
	@OneToOne
	@JoinColumn(name = "benutzername", nullable = false, referencedColumnName = "benutzername")
	private UserEntity benutzer; //TODO UserEntity!
	
<<<<<<< HEAD
	@Column(name = "antwortmoeglichkeit1_check", nullable = false)
	private boolean antwortmoeglichkeit1_check;
	
	@Column(name = "antwortmoeglichkeit2_check", nullable = false)
	private boolean antwortmoeglichkeit2_check;
	
	@Column(name = "antwortmoeglichkeit3_check", nullable = false)
	private boolean antwortmoeglichkeit3_check;
	
	@Column(name = "antwortmoeglichkeit4_check", nullable = false)
	private boolean antwortmoeglichkeit4_check;
=======
	private boolean antwortmoeglichkeit1Check;
	
	private boolean antwortmoeglichkeit2Check;
	
	private boolean antwortmoeglichkeit3Check;
	
	private boolean antwortmoeglichkeit4Check;
>>>>>>> 60880f5b173340775dcef336f3286fe1b67a1384
	
	@Column(name = "flagFrageAngezeigt", nullable = false)
	private boolean flagFrageAngezeigt;
	
<<<<<<< HEAD
	@Column(name = "ergebnis_check", nullable = false)
	private boolean ergebnis_check; // Has the user answered correctly?
=======
	private boolean ergebnisCheck; // Has the user answered correctly?
>>>>>>> 60880f5b173340775dcef336f3286fe1b67a1384

	public AntwortEntity() {
	}

<<<<<<< HEAD
	public AntwortEntity(FrageEntity frage, RundeEntity rundenID, UserEntity benutzer,
			boolean antwortmoeglichkeit1_check,
			boolean antwortmoeglichkeit2_check,
			boolean antwortmoeglichkeit3_check,
			boolean antwortmoeglichkeit4_check, boolean flagFrageAngezeigt,
			boolean ergebnis_check) {
=======
	public AntwortEntity(int fragenID, int rundenID, String benutzername,
			boolean antwortmoeglichkeit1Check,
			boolean antwortmoeglichkeit2Check,
			boolean antwortmoeglichkeit3Check,
			boolean antwortmoeglichkeit4Check, boolean flagFrageAngezeigt,
			boolean ergebnisCheck) {
>>>>>>> 60880f5b173340775dcef336f3286fe1b67a1384
		//XXX only for Mock / Debugging
		this.frage = frage;
		this.rundenID = rundenID;
<<<<<<< HEAD
		this.benutzer = benutzer;
		this.antwortmoeglichkeit1_check = antwortmoeglichkeit1_check;
		this.antwortmoeglichkeit2_check = antwortmoeglichkeit2_check;
		this.antwortmoeglichkeit3_check = antwortmoeglichkeit3_check;
		this.antwortmoeglichkeit4_check = antwortmoeglichkeit4_check;
=======
		this.benutzername = benutzername;
		this.antwortmoeglichkeit1Check = antwortmoeglichkeit1Check;
		this.antwortmoeglichkeit2Check = antwortmoeglichkeit2Check;
		this.antwortmoeglichkeit3Check = antwortmoeglichkeit3Check;
		this.antwortmoeglichkeit4Check = antwortmoeglichkeit4Check;
>>>>>>> 60880f5b173340775dcef336f3286fe1b67a1384
		this.flagFrageAngezeigt = flagFrageAngezeigt;
		this.ergebnisCheck = ergebnisCheck;
	}

	public FrageEntity getFrage() {
		return frage;
	}

	public void setFrage(FrageEntity frage) {
		this.frage = frage;
	}

	public RundeEntity getRundenID() {
		return rundenID;
	}

	public void setRundenID(RundeEntity rundenID) {
		this.rundenID = rundenID;
	}
	
	public UserEntity getBenutzer() {
		return benutzer;
	}

	public void setBenutzer(UserEntity benutzer) {
		this.benutzer = benutzer;
	}

	public boolean isAntwortmoeglichkeit1Check() {
		return antwortmoeglichkeit1Check;
	}

	public void setAntwortmoeglichkeit1Check(boolean antwortmoeglichkeit1Check) {
		this.antwortmoeglichkeit1Check = antwortmoeglichkeit1Check;
	}

	public boolean isAntwortmoeglichkeit2Check() {
		return antwortmoeglichkeit2Check;
	}

	public void setAntwortmoeglichkeit2Check(boolean antwortmoeglichkeit2Check) {
		this.antwortmoeglichkeit2Check = antwortmoeglichkeit2Check;
	}

	public boolean isAntwortmoeglichkeit3Check() {
		return antwortmoeglichkeit3Check;
	}

	public void setAntwortmoeglichkeit3Check(boolean antwortmoeglichkeit3Check) {
		this.antwortmoeglichkeit3Check = antwortmoeglichkeit3Check;
	}

	public boolean isAntwortmoeglichkeit4Check() {
		return antwortmoeglichkeit4Check;
	}

	public void setAntwortmoeglichkeit4Check(boolean antwortmoeglichkeit4Check) {
		this.antwortmoeglichkeit4Check = antwortmoeglichkeit4Check;
	}

	public boolean isFlagFrageAngezeigt() {
		return flagFrageAngezeigt;
	}

	public void setFlagFrageAngezeigt(boolean flagFrageAngezeigt) {
		this.flagFrageAngezeigt = flagFrageAngezeigt;
	}

	public boolean isErgebnisCheck() {
		return ergebnisCheck;
	}

	public void setErgebnisCheck(boolean ergebnisCheck) {
		this.ergebnisCheck = ergebnisCheck;
	}
}
