/**
 * Given a component `C`, `T` is `typeof C`
 */
type ExtractComponentProps<T> = T extends
	| React.ComponentType<infer P>
	| React.Component<infer P>
	? JSX.LibraryManagedAttributes<T, P>
	: never;

export default ExtractComponentProps;
