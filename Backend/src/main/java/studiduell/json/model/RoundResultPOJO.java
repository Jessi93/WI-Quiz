package studiduell.json.model;

public class RoundResultPOJO {
	private int runde;
	
	private int fragenID;
	
	private boolean antwortmoeglichkeit1Check;
	
	private boolean antwortmoeglichkeit2Check;
	
	private boolean antwortmoeglichkeit3Check;
	
	private boolean antwortmoeglichkeit4Check;
	
	private boolean ergebnisCheck;

	public int getRunde() {
		return runde;
	}

	public void setRunde(int runde) {
		this.runde = runde;
	}

	public int getFragenID() {
		return fragenID;
	}

	public void setFragenID(int fragenID) {
		this.fragenID = fragenID;
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

	public boolean isErgebnisCheck() {
		return ergebnisCheck;
	}

	public void setErgebnisCheck(boolean ergebnisCheck) {
		this.ergebnisCheck = ergebnisCheck;
	}
}
