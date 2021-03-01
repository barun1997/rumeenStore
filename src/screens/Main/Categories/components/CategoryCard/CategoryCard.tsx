import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { MenuDropdown } from '../../../../../components/MenuDropdown/MenuDropdown';

interface CategoryCardProps {
	title: string;
	numberOfProducts: number;
	openMenu: (id: string) => void;
	closeMenu: () => void;
	visible: string;
	id: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
	title,
	numberOfProducts,
	openMenu,
	closeMenu,
	id,
	visible,
}) => {
	const { colors } = useTheme();
	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={styles.description}>
					<Title>{title}</Title>
					<Paragraph>{numberOfProducts} Product Listed</Paragraph>
				</View>
				<MenuDropdown
					openMenu={openMenu}
					dismissMenu={closeMenu}
					id={id}
					visible={visible}
					buttonColor={colors.backdrop}
				/>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: { marginVertical: heightPercentageToDP('1%') },
	description: { padding: '5%' },
	rowView: { flexDirection: 'row', justifyContent: 'space-between' },
});
