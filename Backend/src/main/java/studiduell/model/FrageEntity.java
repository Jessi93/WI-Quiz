package studiduell.model;

//FIXME define as ENTITY
//TODO in all entities, remove underscores
public class FrageEntity {
	
	private int fragenID;
	
	private String kategorie_name;
	
	private String unterkategorie_name;
	
	private boolean flag_fragenTyp_mult;
	
	private String frage;
	 
	private String antwortmoeglichkeit1;
	
	private String antwortmoeglichkeit2;
	
	private String antwortmoeglichkeit3;
	
	private String antwortmoeglichkeit4;
	
	private boolean wahrheitAntwortmoeglichkeit1;
	
	private boolean wahrheitAntwortmoeglichkeit2;
	
	private boolean wahrheitAntwortmoeglichkeit3;
	
	private boolean wahrheitAntwortmoeglichkeit4;
	
	private boolean flag_frageValidiert;

	public FrageEntity() {
	}

	public FrageEntity(int fragenID, String kategorie_name,
			String unterkategorie_name, boolean flag_fragenTyp_mult,
			String frage, String antwortmoeglichkeit1,
			String antwortmoeglichkeit2, String antwortmoeglichkeit3,
			String antwortmoeglichkeit4, boolean wahrheitAntwortmoeglichkeit1,
			boolean wahrheitAntwortmoeglichkeit2,
			boolean wahrheitAntwortmoeglichkeit3,
			boolean wahrheitAntwortmoeglichkeit4, boolean flag_frageValidiert) {
		//XXX only for mock / debugging
		
		this.fragenID = fragenID;
		this.kategorie_name = kategorie_name;
		this.unterkategorie_name = unterkategorie_name;
		this.flag_fragenTyp_mult = flag_fragenTyp_mult;
		this.frage = frage;
		this.antwortmoeglichkeit1 = antwortmoeglichkeit1;
		this.antwortmoeglichkeit2 = antwortmoeglichkeit2;
		this.antwortmoeglichkeit3 = antwortmoeglichkeit3;
		this.antwortmoeglichkeit4 = antwortmoeglichkeit4;
		this.wahrheitAntwortmoeglichkeit1 = wahrheitAntwortmoeglichkeit1;
		this.wahrheitAntwortmoeglichkeit2 = wahrheitAntwortmoeglichkeit2;
		this.wahrheitAntwortmoeglichkeit3 = wahrheitAntwortmoeglichkeit3;
		this.wahrheitAntwortmoeglichkeit4 = wahrheitAntwortmoeglichkeit4;
		this.flag_frageValidiert = flag_frageValidiert;
	}

	public int getFragenID() {
		return fragenID;
	}

	public void setFragenID(int fragenID) {
		this.fragenID = fragenID;
	}

	public String getKategorie_name() {
		return kategorie_name;
	}

	public void setKategorie_name(String kategorie_name) {
		this.kategorie_name = kategorie_name;
	}

	public String getUnterkategorie_name() {
		return unterkategorie_name;
	}

	public void setUnterkategorie_name(String unterkategorie_name) {
		this.unterkategorie_name = unterkategorie_name;
	}

	public boolean isFlag_fragenTyp_mult() {
		return flag_fragenTyp_mult;
	}

	public void setFlag_fragenTyp_mult(boolean flag_fragenTyp_mult) {
		this.flag_fragenTyp_mult = flag_fragenTyp_mult;
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

	public boolean isFlag_frageValidiert() {
		return flag_frageValidiert;
	}

	public void setFlag_frageValidiert(boolean flag_frageValidiert) {
		this.flag_frageValidiert = flag_frageValidiert;
	}
}
