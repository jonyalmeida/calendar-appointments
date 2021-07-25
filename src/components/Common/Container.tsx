import React, { ReactElement } from 'react';

interface ContainerProps {
	className?: string;
	children?: ReactElement[] | ReactElement;
}

export const Container = ({ className, children }: ContainerProps) => {
	return (
		<div className={className}>
			{Array.isArray(children)
				? children.map((item: ReactElement) => item)
				: children}
		</div>
	);
};
