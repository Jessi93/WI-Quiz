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
	
	@Column(name = "antwortmoeglichkeit1_check", nullable = false)
	private boolean antwortmoeglichkeit1_check;
	
	@Column(name = "antwortmoeglichkeit2_check", nullable = false)
	private boolean antwortmoeglichkeit2_check;
	
	@Column(name = "antwortmoeglichkeit3_check", nullable = false)
	private boolean antwortmoeglichkeit3_check;
	
	@Column(name = "antwortmoeglichkeit4_check", nullable = false)
	private boolean antwortmoeglichkeit4_check;
	
	@Column(name = "flagFrageAngezeigt", nullable = false)
	private boolean flagFrageAngezeigt;
	
	@Column(name = "ergebnis_check", nullable = false)
	private boolean ergebnis_check; // Has the user answered correctly?

	public AntwortEntity() {
	}

	public AntwortEntity(FrageEntity frage, RundeEntity rundenID, UserEntity benutzer,
			boolean antwortmoeglichkeit1_check,
			boolean antwortmoeglichkeit2_check,
			boolean antwortmoeglichkeit3_check,
			boolean antwortmoeglichkeit4_check, boolean flagFrageAngezeigt,
			boolean ergebnis_check) {
		//XXX only for Mock / Debugging
		this.frage = frage;
		this.rundenID = rundenID;
		this.benutzer = benutzer;
		this.antwortmoeglichkeit1_check = antwortmoeglichkeit1_check;
		this.antwortmoeglichkeit2_check = antwortmoeglichkeit2_check;
		this.antwortmoeglichkeit3_check = antwortmoeglichkeit3_check;
		this.antwortmoeglichkeit4_check = antwortmoeglichkeit4_check;
		this.flagFrageAngezeigt = flagFrageAngezeigt;
		this.ergebnis_check = ergebnis_check;
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

	public boolean isAntwortmoeglichkeit1_check() {
		return antwortmoeglichkeit1_check;
	}

	public void setAntwortmoeglichkeit1_check(boolean antwortmoeglichkeit1_check) {
		this.antwortmoeglichkeit1_check = antwortmoeglichkeit1_check;
	}

	public boolean isAntwortmoeglichkeit2_check() {
		return antwortmoeglichkeit2_check;
	}

	public void setAntwortmoeglichkeit2_check(boolean antwortmoeglichkeit2_check) {
		this.antwortmoeglichkeit2_check = antwortmoeglichkeit2_check;
	}

	public boolean isAntwortmoeglichkeit3_check() {
		return antwortmoeglichkeit3_check;
	}

	public void setAntwortmoeglichkeit3_check(boolean antwortmoeglichkeit3_check) {
		this.antwortmoeglichkeit3_check = antwortmoeglichkeit3_check;
	}

	public boolean isAntwortmoeglichkeit4_check() {
		return antwortmoeglichkeit4_check;
	}

	public void setAntwortmoeglichkeit4_check(boolean antwortmoeglichkeit4_check) {
		this.antwortmoeglichkeit4_check = antwortmoeglichkeit4_check;
	}

	public boolean isFlagFrageAngezeigt() {
		return flagFrageAngezeigt;
	}

	public void setFlagFrageAngezeigt(boolean flagFrageAngezeigt) {
		this.flagFrageAngezeigt = flagFrageAngezeigt;
	}

	public boolean isErgebnis_check() {
		return ergebnis_check;
	}

	public void setErgebnis_check(boolean ergebnis_check) {
		this.ergebnis_check = ergebnis_check;
	}
}
