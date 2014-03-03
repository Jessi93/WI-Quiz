package studiduell.model.id;

import java.io.Serializable;

public class KategorienfilterEntityPk implements Serializable {
	private static final long serialVersionUID = -2739234094594019035L;
	
	private String benutzername;
	private String kategorieName;
	
	public KategorienfilterEntityPk() {
	}

	public KategorienfilterEntityPk(String benutzername, String kategorieName) {
		this.benutzername = benutzername;
		this.kategorieName = kategorieName;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getKategorieName() {
		return kategorieName;
	}

	public void setKategorieName(String kategorieName) {
		this.kategorieName = kategorieName;
	}

	@Override
	public int hashCode() {
		return (int) benutzername.hashCode() + kategorieName.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		if (!(obj instanceof KategorienfilterEntityPk)) {
			return false;
		}
		KategorienfilterEntityPk pk = (KategorienfilterEntityPk) obj;
		return pk.benutzername.equals(benutzername) && pk.kategorieName.equals(kategorieName);
	}
}
