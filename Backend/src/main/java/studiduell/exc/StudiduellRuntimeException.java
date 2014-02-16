package studiduell.exc;

/**
 * A common exception that occurred during some database transaction.<br>
 * 
 * A rollback should be triggered.
 * 
 * @author kevin.strobel
 *
 */
public class StudiduellRuntimeException extends RuntimeException {
	private static final long serialVersionUID = 841659466531510176L;

	public StudiduellRuntimeException(String message) {
		super(message);
	}
}
