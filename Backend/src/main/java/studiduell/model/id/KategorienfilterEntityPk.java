package studiduell.model.id;

import java.io.Serializable;

public class KategorienfilterEntityPk implements Serializable {
	private static final long serialVersionUID = -2739234094594019035L;
	
	private String benutzername;
	private String kategorie_name;
	
	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getKategorie_name() {
		return kategorie_name;
	}

	public void setKategorie_name(String kategorie_name) {
		this.kategorie_name = kategorie_name;
	}

	@Override
	public int hashCode() {
		return (int) benutzername.hashCode() + kategorie_name.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) return false;
		if (obj == this) return true;
		if (!(obj instanceof KategorienfilterEntityPk)) return false;
		KategorienfilterEntityPk pk = (KategorienfilterEntityPk) obj;
		return pk.benutzername.equals(benutzername) && pk.kategorie_name.equals(kategorie_name);
	}
}
