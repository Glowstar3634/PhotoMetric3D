import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, PermissionsAndroid, Platform} from 'react-native';
import styles from '../styles/default';
import { COLORS, SIZES } from '../constants';
import { UserContext } from './UserContext';
import { BleManager } from 'react-native-ble-plx';

const Home = () => {
    const [paired, setPaired] = React.useState(0);
    const [connectedDevice, setConnectedDevice] = React.useState(null);
    const [devices, setDevices] = React.useState([]);
    const manager = React.useRef(new BleManager());
    const { currentUser, setCurrentUser } = React.useContext(UserContext);

        // Parametric equations for x, y, z in JavaScript
    function x_parametric(t) {
        return 4 * Math.sin(t);
    }
    function y_parametric(t) {
        return 4 * Math.cos(t);
    }
    function z_parametric(t) {
        return t;
    }
    
    function generatePoints(t_start, t_end, t_step) {
        const points = [];
    
        for (let t = t_start; t <= t_end; t += t_step) {
            const x = x_parametric(t);
            const y = y_parametric(t);
            const z = z_parametric(t);

            points.push({ x, y, z });

            if (points.length >= 100) break;
        }
    
        return points;
    }

    const requestBluetoothPermissions = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);
                return (
                    granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
                );
            } else {
                return true; // iOS doesn't need explicit permission requests
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    // Discover available BLE devices
    const discoverDevices = async () => {
        const hasPermissions = await requestBluetoothPermissions();
        if (!hasPermissions) {
            Alert.alert('Permissions denied', 'Bluetooth permissions are required.');
            return;
        }

        try {
            setDevices([]);
            console.log('Scanning for devices...');
            manager.current.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    console.log(error);
                    Alert.alert('Error scanning devices', error.message);
                    return;
                }

                // Filter by device name or service (replace 'HC-05' with your device's BLE name or service)
                if (device.name === 'PM3D' || device.id === 'desired_device_id') {
                    setDevices((prevDevices) => [...prevDevices, device]);
                    console.log('Device found:', device.name);
                }
            });

            // Stop scanning after 10 seconds
            setTimeout(() => {
                manager.current.stopDeviceScan();
                console.log('Scan stopped');
            }, 10000);
        } catch (error) {
            Alert.alert('Error', 'Error discovering devices:' + error.message);
        }
    };

    const pairDevice = async () => {
        try {
            await discoverDevices();

            if (devices.length > 0) {
                const bleDevice = devices.find(device => device.name === 'PM3D');
                if (bleDevice) {
                    console.log('Found PM3D');
                    const connected = await bleDevice.connect();
                    if (connected) {
                        setPaired(2);
                        setConnectedDevice(bleDevice);
                        Alert.alert('Success', 'Connected to PM3D');
                    }
                } else {
                    Alert.alert('Device not found', 'PM3D not found in available devices');
                    setPaired(0);
                }
            } else {
                Alert.alert('No devices', 'No Bluetooth devices found');
                setPaired(0);
            }
        } catch (error) {
            Alert.alert('Connection error', 'Failed to connect to device');
            setPaired(0);
        }
    };

    // Disconnect from BLE device
    const disconnectDevice = async () => {
        if (connectedDevice) {
            await connectedDevice.cancelConnection();
            setPaired(false);
            setConnectedDevice(null);
            Alert.alert('Disconnected', 'Device disconnected');
        }
    };

    const handlePair = () => {
        if (paired === 2) {
            disconnectDevice();
        } else if (paired === 0) {
            setPaired(1);
            pairDevice();
        }
    };

    React.useEffect(() => {
        requestBluetoothPermissions();
        return () => manager.current.destroy();
    }, []);

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.dark,
        }}>
            <Image
                style={{ width: '100%', height: 100, zIndex: 500, alignSelf: 'center', marginTop: 30 }}
                resizeMode="contain"
                source={require('../constants/images/PM3DLogo.png')}
            />
            <ScrollView style={{
                flex: 1,
                width: '100%',
            }} contentContainerStyle={{
                alignItems: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 100,
                    width: '100%',
                }}>
                    <TouchableOpacity onPress={handlePair}>
                        {paired == 2 ? (
                            <Image
                                style={{ height: 100, width: 100, zIndex: 500, alignSelf: 'center' }}
                                resizeMode="contain"
                                source={require('../constants/images/PM3D_Paired2.png')}
                            />
                        ) : (
                            <Image
                                style={{ height: 100, width: 100, zIndex: 500, alignSelf: 'center' }}
                                resizeMode="contain"
                                source={require('../constants/images/PM3D_Unpaired2.png')}
                            />
                        )}
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}>
                        <Text style={[styles.subHeader1, { color: "white", fontWeight: "600", fontStyle: 'italic', fontSize: SIZES.xLarge }]}>
                            Bluetooth PM3D Device
                        </Text>
                        <Text style={[styles.subHeader1, { color: "white", fontWeight: "600", fontStyle: 'italic', fontSize: SIZES.medium }]}>
                            Status: {paired == 2 ? "Connected" : (paired == 1 ? "Pairing..." : "Unpaired")}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
