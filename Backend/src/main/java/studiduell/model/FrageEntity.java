package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
	
	@JoinColumn(name = "kategorieName", nullable = false, referencedColumnName = "name")
	@OneToOne
	private KategorieEntity kategorieName;
	
	@JoinColumn(name = "unterkategorieName")
	private String unterkategorieName; //XXX as entity
	
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
	
	@JsonIgnore // TODO maybe also on different properties, as client is not interested in that property
	@Column(name = "flagFrageValidiert", nullable = false)
	private boolean flagFrageValidiert;

	public FrageEntity() {
	}

	public FrageEntity(int fragenID, KategorieEntity kategorieName,
			String unterkategorieName, boolean flagFragenTypMult, String frage,
			String antwortmoeglichkeit1, String antwortmoeglichkeit2,
			String antwortmoeglichkeit3, String antwortmoeglichkeit4,
			boolean wahrheitAntwortmoeglichkeit1,
			boolean wahrheitAntwortmoeglichkeit2,
			boolean wahrheitAntwortmoeglichkeit3,
			boolean wahrheitAntwortmoeglichkeit4, boolean flagFrageValidiert) {
		//XXX
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

	public KategorieEntity getKategorieName() {
		return kategorieName;
	}

	public void setKategorieName(KategorieEntity kategorieName) {
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
