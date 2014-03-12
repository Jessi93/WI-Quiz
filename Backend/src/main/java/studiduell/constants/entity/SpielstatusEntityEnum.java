package studiduell.constants.entity;

import studiduell.model.SpielstatusEntity;

public enum SpielstatusEntityEnum {
	A('A'),
	P('P'),
	C('C'),
	D('D'),
	Q('Q');
	
	private SpielstatusEntity entity;
	
	SpielstatusEntityEnum(char status) {
		entity = new SpielstatusEntity(status);
	}
	
	public SpielstatusEntity getEntity() {
		return entity;
	}
}

//XXX use such enums