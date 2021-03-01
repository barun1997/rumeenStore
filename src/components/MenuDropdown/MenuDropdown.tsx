import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface MenuDropdownProps {
	visible: string;
	buttonColor: string;
	dismissMenu: () => void;
	openMenu: (id: string) => void;
	id: string;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
	id,
	dismissMenu,
	openMenu,
	buttonColor,
	visible,
}) => (
	<View style={styles.optionMenu}>
		<Menu
			visible={visible === id}
			onDismiss={dismissMenu}
			anchor={
				<IconButton
					style={styles.actionButton}
					color={buttonColor}
					size={heightPercentageToDP('3%')}
					icon="dots-horizontal"
					onPress={() => openMenu(id)}
				/>
			}>
			<Menu.Item icon="pencil" onPress={() => {}} title="Edit" />
			<Menu.Item icon="delete" onPress={() => {}} title="Delete" />
		</Menu>
	</View>
);

const styles = StyleSheet.create({
	optionMenu: { justifyContent: 'center', alignItems: 'center' },
	actionButton: { alignSelf: 'center' },
});