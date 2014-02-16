package studiduell.security;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextHolderFacade implements SecurityContextFacade {

    @Override
    public SecurityContext getContext() {
        return SecurityContextHolder.getContext();
    }

    @Override
    public void setContext(SecurityContext securityContext) {
        SecurityContextHolder.setContext(securityContext);
    }

}
