package studiduell.model.id;

import java.io.Serializable;

public class FreundeslisteEntityPk implements Serializable {
	private static final long serialVersionUID = -2878511960101902049L;
	
	private String benutzername;
	private String befreundetMit;
	
	public FreundeslisteEntityPk() {
	}

	public FreundeslisteEntityPk(String benutzername, String befreundetMit) {
		this.benutzername = benutzername;
		this.befreundetMit = befreundetMit;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getBefreundetMit() {
		return befreundetMit;
	}

	public void setBefreundetMit(String befreundetMit) {
		this.befreundetMit = befreundetMit;
	}

	@Override
	public int hashCode() {
		return (int) benutzername.hashCode() + befreundetMit.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) return false;
		if (obj == this) return true;
		if (!(obj instanceof FreundeslisteEntityPk)) return false;
		FreundeslisteEntityPk pk = (FreundeslisteEntityPk) obj;
		return pk.benutzername.equals(benutzername) && pk.befreundetMit.equals(befreundetMit);
	}
}
