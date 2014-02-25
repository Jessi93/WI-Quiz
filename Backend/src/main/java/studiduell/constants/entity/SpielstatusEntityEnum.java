package studiduell.constants.entity;

import studiduell.model.SpielstatusEntity;

public enum SpielstatusEntityEnum {
	A('A'),
	P('P'),
	C('C'),
	D('D');
	
	private SpielstatusEntity entity;
	
	SpielstatusEntityEnum(char status) {
		entity = new SpielstatusEntity(status);
	}
	
	public SpielstatusEntity getEntity() {
		return entity;
	}
}

//TODO use such enums