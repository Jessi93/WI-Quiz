package studiduell.model;

//FIXME define as ENTITY
public class AntwortEntity {
	
	private int fragenID;
	
	private int rundenID;
	
	private String benutzername;
	
	private boolean antwortmoeglichkeit1Check;
	
	private boolean antwortmoeglichkeit2Check;
	
	private boolean antwortmoeglichkeit3Check;
	
	private boolean antwortmoeglichkeit4Check;
	
	private boolean flagFrageAngezeigt;
	
	private boolean ergebnisCheck; // Has the user answered correctly?

	public AntwortEntity() {
	}

	public AntwortEntity(int fragenID, int rundenID, String benutzername,
			boolean antwortmoeglichkeit1Check,
			boolean antwortmoeglichkeit2Check,
			boolean antwortmoeglichkeit3Check,
			boolean antwortmoeglichkeit4Check, boolean flagFrageAngezeigt,
			boolean ergebnisCheck) {
		//XXX only for Mock / Debugging
		this.fragenID = fragenID;
		this.rundenID = rundenID;
		this.benutzername = benutzername;
		this.antwortmoeglichkeit1Check = antwortmoeglichkeit1Check;
		this.antwortmoeglichkeit2Check = antwortmoeglichkeit2Check;
		this.antwortmoeglichkeit3Check = antwortmoeglichkeit3Check;
		this.antwortmoeglichkeit4Check = antwortmoeglichkeit4Check;
		this.flagFrageAngezeigt = flagFrageAngezeigt;
		this.ergebnisCheck = ergebnisCheck;
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

	public void setAntwortmoeglichkeit3_check(boolean antwortmoeglichkeit3Check) {
		this.antwortmoeglichkeit3Check = antwortmoeglichkeit3Check;
	}

	public boolean isAntwortmoeglichkeit4Check() {
		return antwortmoeglichkeit4Check;
	}

	public void setAntwortmoeglichkeit4_check(boolean antwortmoeglichkeit4Check) {
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
