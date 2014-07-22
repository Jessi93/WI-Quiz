package studiduell.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

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
	@JoinColumn(name = "rundenID", unique = true, nullable = false)
	private int rundenID;
	
	@JsonIgnore
	@JoinColumn(name = "spielID")
	@ManyToOne
	private SpielEntity spiel;
	
	@Column(name = "rundenNr")
	private int rundenNr;
	
	// relationships
	@OneToMany(mappedBy = "rundenID", fetch = FetchType.EAGER)
	@OrderBy("frage.fragenID ASC") // used for gameOverview
	private List<AntwortEntity> answers;

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
	
	public List<AntwortEntity> getAnswers() {
		return answers;
	}
}