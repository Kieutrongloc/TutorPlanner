import React, { useState } from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocation, faPhone, faEnvelope, faMessage, faComment, faShare, faCode, faSignOut, faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import SignIn from '../components/ProfileNavigation/SignIn';
import SignUp from '../components/ProfileNavigation/SignUp';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

// import files from '../../assets/filesBase64';
const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isShowSignIn, setIsShowSignIn] = React.useState(false);
  const [isShowSignUp, setIsShowSignUp] = React.useState(false);

  const myCustomShare = async() => {
    const shareOptions = {
      message: 'This app is the best for any Tutor to manage their classes. Everything is free. Install it now!',
      // url: files.appLogo,
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };

  const updateAvatar = () => {
    console.log('update avatar')
  };

  const showSignInHandle = () => {
    setIsShowSignIn(!isShowSignIn)
  };

  const showSignUpHandle = () => {
    setIsShowSignUp(!isShowSignUp)
  };

  const showSignInSwitch = () => {
    showSignUpHandle();
    showSignInHandle();
  };

  const showSignUpSwitch = () => {
    showSignInHandle();
    showSignUpHandle();
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <SignIn isVisible={isShowSignIn} onClose={() => setIsShowSignIn(!isShowSignIn)} onOpenSignUp={showSignInSwitch}/>
        <SignUp isVisible={isShowSignUp} onClose={() => setIsShowSignUp(!isShowSignUp)} onOpenSignIn={showSignUpSwitch} />
      </TouchableOpacity>

      {
        isLoggedIn ? (
          <>
            <View>
              <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TouchableOpacity onPress={updateAvatar}>
                    <Avatar.Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/8090/8090430.png',
                      }}
                      size={80}
                    />
                  </TouchableOpacity>
                  <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {
                      marginTop:15,
                      marginBottom: 5,
                    }]}>Trong Loc</Title>
                    <Caption style={styles.caption}>ID: 001</Caption>
                  </View>
                </View>
              </View>

              <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <FontAwesomeIcon icon={ faLocation } color="#777777" size={20} />
                  <Text style={{color:"#777777", marginLeft: 20}}>Hanoi, Vietnam</Text>
                </View>
                <View style={styles.row}>
                  <FontAwesomeIcon icon={ faPhone } color="#777777" size={20} />
                  <Text style={{color:"#777777", marginLeft: 20}}>+84 965 921631</Text>
                </View>
                <View style={styles.row}>
                  <FontAwesomeIcon icon={ faEnvelope } color="#777777" size={20} />
                  <Text style={{color:"#777777", marginLeft: 20}}>locbaobao.com</Text>
                </View>
              </View>

              <View style={styles.infoBoxWrapper}>
                  <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                  }]}>
                    <Title>15.000.000 VND</Title>
                    <Caption>Earning this month</Caption>
                  </View>
                  <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Classes</Caption>
                  </View>
              </View>

            </View>

          </>
        ) : (
          <>
            <View>
              <View style={styles.accountOption} >
                <TouchableOpacity style={styles.accountOptionItems} onPress={showSignInHandle}>
                  <FontAwesomeIcon icon={ faSignIn } color="green" size={25} />
                  <Text style={styles.optionItemstext}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.accountOptionItems} onPress={showSignUpHandle}>
                  <FontAwesomeIcon icon={ faUserPlus } color="green" size={25} />
                  <Text style={styles.optionItemstext}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
      }


      {/* <View>
        <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
            <FontAwesomeIcon icon={ faComment } color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Feedback</Text>
            </View>
          </TouchableRipple>
      </View> */}

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
          <FontAwesomeIcon icon={ faComment } color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Feedback</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <FontAwesomeIcon icon={ faMessage } color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Review on Store</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <FontAwesomeIcon icon={ faShare } color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Share this app</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItemWrapper}>
            <View style={styles.menuItem}>
              <FontAwesomeIcon icon={ faCode } color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>App version</Text>
            </View>
            <View>
              <Text style={styles.menuItemSpan}>v1.0.0</Text>
            </View>
          </View>
        </TouchableRipple>
        {
          isLoggedIn && (
            <>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <FontAwesomeIcon icon={ faSignOut } color="#FF6347" size={25} />
                  <Text style={styles.menuItemText}>Logout</Text>
                </View>
              </TouchableRipple>
            </>
          )
        }
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountOption: {
    width: '100%',
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dadada'
  },
  accountOptionItems: {
    flexDirection: 'row',
  },
  optionItemstext: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
    marginLeft: 6
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '94%',
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  menuItemSpan: {
    color: '#777777',
    fontSize: 16,
  }
});