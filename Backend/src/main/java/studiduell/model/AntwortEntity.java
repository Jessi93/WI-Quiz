package studiduell.model;

//FIXME define as ENTITY
public class AntwortEntity {
	
	private int fragenID;
	
	private int rundenID;
	
	private String benutzername;
	
	private boolean antwortmoeglichkeit1_check;
	
	private boolean antwortmoeglichkeit2_check;
	
	private boolean antwortmoeglichkeit3_check;
	
	private boolean antwortmoeglichkeit4_check;
	
	private boolean flagFrageAngezeigt;
	
	private boolean ergebnis_check; // Has the user answered correctly?

	public AntwortEntity() {
	}

	public AntwortEntity(int fragenID, int rundenID, String benutzername,
			boolean antwortmoeglichkeit1_check,
			boolean antwortmoeglichkeit2_check,
			boolean antwortmoeglichkeit3_check,
			boolean antwortmoeglichkeit4_check, boolean flagFrageAngezeigt,
			boolean ergebnis_check) {
		//XXX only for Mock / Debugging
		this.fragenID = fragenID;
		this.rundenID = rundenID;
		this.benutzername = benutzername;
		this.antwortmoeglichkeit1_check = antwortmoeglichkeit1_check;
		this.antwortmoeglichkeit2_check = antwortmoeglichkeit2_check;
		this.antwortmoeglichkeit3_check = antwortmoeglichkeit3_check;
		this.antwortmoeglichkeit4_check = antwortmoeglichkeit4_check;
		this.flagFrageAngezeigt = flagFrageAngezeigt;
		this.ergebnis_check = ergebnis_check;
	}

	public int getFragenID() {
		return fragenID;
	}

	public void setFragenID(int fragenID) {
		this.fragenID = fragenID;
	}

	public int getRundenID() {
		return rundenID;
	}

	public void setRundenID(int rundenID) {
		this.rundenID = rundenID;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
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
