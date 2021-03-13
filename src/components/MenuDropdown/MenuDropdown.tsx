import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface MenuDropdownProps {
	visible: boolean;
	buttonColor: string;
	dismissMenu: () => void;
	openMenu: (id: string) => void;
	editAction: () => void;
	deleteAction: () => void;
	handleListed?: (listed: boolean) => void;
	listedValue: boolean;
	id: string;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
	id,
	dismissMenu,
	openMenu,
	editAction,
	deleteAction,
	handleListed,
	buttonColor,
	listedValue,
	visible,
}) => {
	return (
		<View style={styles.optionMenu}>
			<Menu
				visible={visible}
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
				<Menu.Item
					icon="pencil"
					onPress={() => {
						dismissMenu();
						editAction();
					}}
					title="Edit"
				/>
				{handleListed && (
					<Menu.Item
						icon={listedValue ? 'close-circle' : 'clipboard-arrow-down'}
						onPress={() => {
							dismissMenu();
							handleListed(listedValue);
						}}
						title={listedValue ? 'Delist' : 'List'}
					/>
				)}

				<Menu.Item
					icon="delete"
					onPress={() => {
						dismissMenu();
						deleteAction();
					}}
					title="Delete"
				/>
			</Menu>
		</View>
	);
};

const styles = StyleSheet.create({
	optionMenu: { justifyContent: 'center', alignItems: 'center' },
	actionButton: { alignSelf: 'center' },
});
