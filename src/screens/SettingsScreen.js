import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({navigation}) => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    notifications: true,
    darkMode: false,
  });

  // Editing states
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  // Handle edit start
  const startEditing = field => {
    setEditingField(field);
    setTempValue(userData[field]);
  };

  // Handle save
  const saveEdit = () => {
    setUserData({...userData, [editingField]: tempValue});
    setEditingField(null);
  };

  // Handle cancel edit
  const cancelEdit = () => {
    setEditingField(null);
  };

  // Toggle switches
  const toggleSwitch = field => {
    setUserData({...userData, [field]: !userData[field]});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="person-outline"
                size={20}
                color="#888"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Name</Text>
            </View>
            {editingField === 'name' ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={tempValue}
                  onChangeText={setTempValue}
                  autoFocus
                />
                <TouchableOpacity onPress={saveEdit} style={styles.editAction}>
                  <Icon name="checkmark" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelEdit}
                  style={styles.editAction}>
                  <Icon name="close" size={20} color="#E53935" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.settingValueContainer}
                onPress={() => startEditing('name')}>
                <Text style={styles.settingValue}>{userData.name}</Text>
                <Icon name="chevron-forward" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="mail-outline"
                size={20}
                color="#888"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Email</Text>
            </View>
            {editingField === 'email' ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={tempValue}
                  onChangeText={setTempValue}
                  keyboardType="email-address"
                  autoFocus
                />
                <TouchableOpacity onPress={saveEdit} style={styles.editAction}>
                  <Icon name="checkmark" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelEdit}
                  style={styles.editAction}>
                  <Icon name="close" size={20} color="#E53935" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.settingValueContainer}
                onPress={() => startEditing('email')}>
                <Text style={styles.settingValue}>{userData.email}</Text>
                <Icon name="chevron-forward" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="call-outline"
                size={20}
                color="#888"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Phone</Text>
            </View>
            {editingField === 'phone' ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={tempValue}
                  onChangeText={setTempValue}
                  keyboardType="phone-pad"
                  autoFocus
                />
                <TouchableOpacity onPress={saveEdit} style={styles.editAction}>
                  <Icon name="checkmark" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelEdit}
                  style={styles.editAction}>
                  <Icon name="close" size={20} color="#E53935" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.settingValueContainer}
                onPress={() => startEditing('phone')}>
                <Text style={styles.settingValue}>{userData.phone}</Text>
                <Icon name="chevron-forward" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="notifications-outline"
                size={20}
                color="#888"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={userData.notifications}
              onValueChange={() => toggleSwitch('notifications')}
              trackColor={{false: '#767577', true: '#D4AF37'}}
              thumbColor={userData.notifications ? '#FFF' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="moon-outline"
                size={20}
                color="#888"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={userData.darkMode}
              onValueChange={() => toggleSwitch('darkMode')}
              trackColor={{false: '#767577', true: '#D4AF37'}}
              thumbColor={userData.darkMode ? '#FFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Account Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.actionText}>Change Password</Text>
            <Icon name="chevron-forward" size={18} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Icon name="log-out-outline" size={22} color="#FF6B6B" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIconPlaceholder: {
    width: 24,
  },
  content: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 5,
    padding: 8,
    minWidth: 150,
    fontSize: 14,
    color: '#333',
  },
  editAction: {
    marginLeft: 10,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingsScreen;
