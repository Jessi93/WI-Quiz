package studiduell.model.id;

import java.io.Serializable;

public class AntwortEntityPk implements Serializable {
	private static final long serialVersionUID = 8683166755737598724L;
	
	private int frage; // meaning fragenID
	private int rundenID;
	private String benutzer;
	
	public AntwortEntityPk() {
	}

	public AntwortEntityPk(int frage, int rundenID, String benutzer) {
		this.frage = frage;
		this.rundenID = rundenID;
		this.benutzer = benutzer;
	}

	public int getFrage() {
		return frage;
	}

	public void setFrage(int frage) {
		this.frage = frage;
	}

	public int getRundenID() {
		return rundenID;
	}

	public void setRundenID(int rundenID) {
		this.rundenID = rundenID;
	}

	public String getBenutzer() {
		return benutzer;
	}

	public void setBenutzer(String benutzer) {
		this.benutzer = benutzer;
	}

	@Override
	public int hashCode() {
		return rundenID + benutzer.hashCode() + frage;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		if (!(obj instanceof AntwortEntityPk)) {
			return false;
		}
		AntwortEntityPk pk = (AntwortEntityPk) obj;
		return pk.rundenID == rundenID
				&& pk.benutzer.equals(benutzer)
				&& pk.frage == frage;
	}
}
