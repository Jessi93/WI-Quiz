package studiduell.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

//TODO in all entities, remove underscores
@Entity
@Table(name = "Frage")
public class FrageEntity {
	
	@Id
	@GeneratedValue
	@JoinColumn(name = "fragenID", unique = true, nullable = false)
	private int fragenID;
	
	@JoinColumn(name = "kategorie_name", nullable = false)
	private String kategorie_name; //XXX as entity
	
	@JoinColumn(name = "unterkategorie_name")
	private String unterkategorie_name; //XXX as entity
	
	@Column(name = "flagFragenTypMult", nullable = false)
	private boolean flagFragenTypMult;
	
	@Column(name = "frage", unique = true, nullable = false)
	private String frage;
	 
	@Column(name = "antwortmoeglichkeit1", nullable = false)
	private String antwortmoeglichkeit1;
	
	@Column(name = "antwortmoeglichkeit2", nullable = false)
	private String antwortmoeglichkeit2;
	
	@Column(name = "antwortmoeglichkeit3", nullable = false)
	private String antwortmoeglichkeit3;
	
	@Column(name = "antwortmoeglichkeit4", nullable = false)
	private String antwortmoeglichkeit4;
	
	@Column(name = "wahrheitAntwortmoeglichkeit1", nullable = false)
	private boolean wahrheitAntwortmoeglichkeit1;
	
	@Column(name = "wahrheitAntwortmoeglichkeit2", nullable = false)
	private boolean wahrheitAntwortmoeglichkeit2;
	
	@Column(name = "wahrheitAntwortmoeglichkeit3", nullable = false)
	private boolean wahrheitAntwortmoeglichkeit3;
	
	@Column(name = "wahrheitAntwortmoeglichkeit4", nullable = false)
	private boolean wahrheitAntwortmoeglichkeit4;
	
	@Column(name = "flagFrageValidiert", nullable = false)
	private boolean flagFrageValidiert;

	public FrageEntity() {
	}

	public FrageEntity(int fragenID, String kategorie_name,
			String unterkategorie_name, boolean flagFragenTypMult,
			String frage, String antwortmoeglichkeit1,
			String antwortmoeglichkeit2, String antwortmoeglichkeit3,
			String antwortmoeglichkeit4, boolean wahrheitAntwortmoeglichkeit1,
			boolean wahrheitAntwortmoeglichkeit2,
			boolean wahrheitAntwortmoeglichkeit3,
			boolean wahrheitAntwortmoeglichkeit4, boolean flagFrageValidiert) {
		this.fragenID = fragenID;
		this.kategorie_name = kategorie_name;
		this.unterkategorie_name = unterkategorie_name;
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
