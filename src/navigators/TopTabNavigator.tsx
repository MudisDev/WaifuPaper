import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AdminAddWaifu } from '../screens/AdminAddWaifu';
import { AdminEditWaifu } from '../screens/AdminEditWaifu';
import { AdminWallpapers } from '../screens/AdminWallpapers';

const Tabs = createMaterialTopTabNavigator();

export function TopTabNavigator() {
    return (
        <Tabs.Navigator
        >
            <Tabs.Screen name="AdminAddWaifu" component={AdminAddWaifu} options={{ tabBarLabel: 'Add Waifu' }} />
            <Tabs.Screen name="AdminEditWaifu" component={AdminEditWaifu} options={{ tabBarLabel: 'Edit Waifu' }} />
            <Tabs.Screen name="AdminWallpapers" component={AdminWallpapers} options={{ tabBarLabel: 'Wallpapers' }} />

        </Tabs.Navigator>
    );
}
