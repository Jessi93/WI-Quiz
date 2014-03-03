package studiduell.model;

//FIXME define as ENTITY
//TODO in all entities, remove underscores
public class FrageEntity {
	
	private int fragenID;
	
	private String kategorieName;
	
	private String unterkategorieName;
	
	private boolean flagFragenTypMult;
	
	private String frage;
	 
	private String antwortmoeglichkeit1;
	
	private String antwortmoeglichkeit2;
	
	private String antwortmoeglichkeit3;
	
	private String antwortmoeglichkeit4;
	
	private boolean wahrheitAntwortmoeglichkeit1;
	
	private boolean wahrheitAntwortmoeglichkeit2;
	
	private boolean wahrheitAntwortmoeglichkeit3;
	
	private boolean wahrheitAntwortmoeglichkeit4;
	
	private boolean flagFrageValidiert;

	public FrageEntity() {
	}

	public FrageEntity(int fragenID, String kategorieName,
			String unterkategorieName, boolean flagFragenTypMult,
			String frage, String antwortmoeglichkeit1,
			String antwortmoeglichkeit2, String antwortmoeglichkeit3,
			String antwortmoeglichkeit4, boolean wahrheitAntwortmoeglichkeit1,
			boolean wahrheitAntwortmoeglichkeit2,
			boolean wahrheitAntwortmoeglichkeit3,
			boolean wahrheitAntwortmoeglichkeit4, boolean flagFrageValidiert) {
		//XXX only for mock / debugging
		
		this.fragenID = fragenID;
		this.kategorieName = kategorieName;
		this.unterkategorieName = unterkategorieName;
		this.flagFragenTypMult = flagFragenTypMult;
		this.frage = frage;
		this.antwortmoeglichkeit1 = antwortmoeglichkeit1;
		this.antwortmoeglichkeit2 = antwortmoeglichkeit2;
		this.antwortmoeglichkeit3 = antwortmoeglichkeit3;
		this.antwortmoeglichkeit4 = antwortmoeglichkeit4;
		this.wahrheitAntwortmoeglichkeit1 = wahrheitAntwortmoeglichkeit1;
		this.wahrheitAntwortmoeglichkeit2 = wahrheitAntwortmoeglichkeit2;
		this.wahrheitAntwortmoeglichkeit3 = wahrheitAntwortmoeglichkeit3;
		this.wahrheitAntwortmoeglichkeit4 = wahrheitAntwortmoeglichkeit4;
		this.flagFrageValidiert = flagFrageValidiert;
	}

	public int getFragenID() {
		return fragenID;
	}

	public void setFragenID(int fragenID) {
		this.fragenID = fragenID;
	}

	public String getKategorieName() {
		return kategorieName;
	}

	public void setKategorieName(String kategorieName) {
		this.kategorieName = kategorieName;
	}

	public String getUnterkategorieName() {
		return unterkategorieName;
	}

	public void setUnterkategorieName(String unterkategorieName) {
		this.unterkategorieName = unterkategorieName;
	}

	public boolean isFlagFragenTypMult() {
		return flagFragenTypMult;
	}

	public void setFlagFragenTypMult(boolean flagFragenTypMult) {
		this.flagFragenTypMult = flagFragenTypMult;
	}

	public String getFrage() {
		return frage;
	}

	public void setFrage(String frage) {
		this.frage = frage;
	}

	public String getAntwortmoeglichkeit1() {
		return antwortmoeglichkeit1;
	}

	public void setAntwortmoeglichkeit1(String antwortmoeglichkeit1) {
		this.antwortmoeglichkeit1 = antwortmoeglichkeit1;
	}

	public String getAntwortmoeglichkeit2() {
		return antwortmoeglichkeit2;
	}

	public void setAntwortmoeglichkeit2(String antwortmoeglichkeit2) {
		this.antwortmoeglichkeit2 = antwortmoeglichkeit2;
	}

	public String getAntwortmoeglichkeit3() {
		return antwortmoeglichkeit3;
	}

	public void setAntwortmoeglichkeit3(String antwortmoeglichkeit3) {
		this.antwortmoeglichkeit3 = antwortmoeglichkeit3;
	}

	public String getAntwortmoeglichkeit4() {
		return antwortmoeglichkeit4;
	}

	public void setAntwortmoeglichkeit4(String antwortmoeglichkeit4) {
		this.antwortmoeglichkeit4 = antwortmoeglichkeit4;
	}

	public boolean isWahrheitAntwortmoeglichkeit1() {
		return wahrheitAntwortmoeglichkeit1;
	}

	public void setWahrheitAntwortmoeglichkeit1(boolean wahrheitAntwortmoeglichkeit1) {
		this.wahrheitAntwortmoeglichkeit1 = wahrheitAntwortmoeglichkeit1;
	}

	public boolean isWahrheitAntwortmoeglichkeit2() {
		return wahrheitAntwortmoeglichkeit2;
	}

	public void setWahrheitAntwortmoeglichkeit2(boolean wahrheitAntwortmoeglichkeit2) {
		this.wahrheitAntwortmoeglichkeit2 = wahrheitAntwortmoeglichkeit2;
	}

	public boolean isWahrheitAntwortmoeglichkeit3() {
		return wahrheitAntwortmoeglichkeit3;
	}

	public void setWahrheitAntwortmoeglichkeit3(boolean wahrheitAntwortmoeglichkeit3) {
		this.wahrheitAntwortmoeglichkeit3 = wahrheitAntwortmoeglichkeit3;
	}

	public boolean isWahrheitAntwortmoeglichkeit4() {
		return wahrheitAntwortmoeglichkeit4;
	}

	public void setWahrheitAntwortmoeglichkeit4(boolean wahrheitAntwortmoeglichkeit4) {
		this.wahrheitAntwortmoeglichkeit4 = wahrheitAntwortmoeglichkeit4;
	}

	public boolean isFlagFrageValidiert() {
		return flagFrageValidiert;
	}

	public void setFlagFrageValidiert(boolean flagFrageValidiert) {
		this.flagFrageValidiert = flagFrageValidiert;
	}
}
