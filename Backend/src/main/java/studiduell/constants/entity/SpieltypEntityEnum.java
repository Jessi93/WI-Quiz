package studiduell.constants.entity;

import studiduell.model.SpieltypEntity;

public enum SpieltypEntityEnum {
	S('S'),
	M('M');
	
	private SpieltypEntity entity;
	
	SpieltypEntityEnum(char type) {
		entity = new SpieltypEntity(type);
	}
	
	public SpieltypEntity getEntity() {
		return entity;
	}
}