export const Link = ({ href, label, children }) => (
	<a href={href} className='external-link' aria-label={label}>
		{children}
	</a>
);
