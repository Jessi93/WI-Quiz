package studiduell.misc;

import java.util.Comparator;

import org.springframework.stereotype.Component;

import studiduell.model.FrageEntity;

@Component
public class QuestionsSorter implements Comparator<FrageEntity> {
	@Override
	public int compare(FrageEntity o1, FrageEntity o2) {
		return (o1.getFragenID() < o2.getFragenID()) ? -1
				: ((o1.getFragenID() > o2.getFragenID()) ? 1
						: 0);
	}
}
