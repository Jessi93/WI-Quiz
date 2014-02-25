package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Runde")
public class RundeEntity {
	
	public RundeEntity() {
	}

	public RundeEntity(SpielEntity spiel, int rundenNr) {
		this.spiel = spiel;
		this.rundenNr = rundenNr;
	}

	@Id
	@GeneratedValue
	@Column(name = "rundenID", unique = true, nullable = false)
	private int rundenID;
	
	@JoinColumn(name = "spielID")
	@ManyToOne
	private SpielEntity spiel;
	
	@Column(name = "rundenNr")
	private int rundenNr;

	public int getRundenID() {
		return rundenID;
	}

	public void setRundenID(int rundenID) {
		this.rundenID = rundenID;
	}

	public SpielEntity getSpiel() {
		return spiel;
	}

	public void setSpiel(SpielEntity spiel) {
		this.spiel = spiel;
	}

	public int getRundenNr() {
		return rundenNr;
	}

	public void setRundenNr(int rundenNr) {
		this.rundenNr = rundenNr;
	}
}


//TODO IDs int -> long, auch in DB