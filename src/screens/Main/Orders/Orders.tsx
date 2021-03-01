import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import NavigationBar from '../../../components/NavigationBar';
import { SelectDropdown } from '../../../components/SelectDropdown/SelectDropdown';
import { getValuesForEnum } from '../../../constants/getValuesForEnum';
import OrderStatus from '../../../constants/orderStatus';
import OrdersScreen from './screens/OrdersList/OrdersList';
import SingleOrderScreen from './screens/SingleOrderDetail/SingleOrderDetail';

const Stack = createStackNavigator();

//TODO: Refactor menu selection logic

function Orders(): JSX.Element {
	const [status, setStatus] = useState<string>('');

	const [visible, setVisible] = useState(false);

	const openMenu = () => {
		setVisible(true);
	};

	const closeMenu = () => {
		setVisible(false);
	};

	const handleSelectStatus = (status: string) => {
		setStatus(status);
	};

	return (
		<Stack.Navigator
			initialRouteName="OrdersList"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="OrdersList"
				options={{
					title: 'Orders',
					headerRight: () => (
						<SelectDropdown
							value={status}
							handleItemPress={handleSelectStatus}
							visible={visible}
							openMenu={openMenu}
							dismissMenu={closeMenu}
							data={getValuesForEnum(OrderStatus)}
						/>
					),
				}}>
				{(props) => <OrdersScreen status={status} {...props} />}
			</Stack.Screen>
			<Stack.Screen
				name="SingleOrder"
				component={SingleOrderScreen}
				options={{
					title: 'Single Order',
				}}
			/>
		</Stack.Navigator>
	);
}

export default Orders;
