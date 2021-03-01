import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

interface SelectDropdownProps {
	data: string[];
	value: string | undefined;
	visible: boolean;
	dismissMenu: () => void;
	openMenu: () => void;
	handleItemPress: (element: string) => void;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
	data,
	value,
	visible,
	dismissMenu,
	openMenu,
	handleItemPress,
}) => {
	return (
		<View style={styles.optionMenu}>
			<Menu
				visible={visible}
				onDismiss={dismissMenu}
				anchor={<Appbar.Action disabled={false} color="white" icon="filter" onPress={openMenu} />}>
				<Menu.Item
					onPress={() => handleItemPress('')}
					title="All"
					icon={value === '' ? 'check' : undefined}
				/>
				{data.map((element) => (
					<Menu.Item
						key={element}
						onPress={() => handleItemPress(element)}
						title={element}
						icon={value === element ? 'check' : undefined}
					/>
				))}
			</Menu>
		</View>
	);
};

const styles = StyleSheet.create({
	optionMenu: { justifyContent: 'center', alignItems: 'center' },
	actionButton: { alignSelf: 'center' },
});
