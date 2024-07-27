import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar.js";
import Boost from "./Boost.js";
import Main from "./Main.js";
import Task from "./Task.js";
import RefLink from "./RefLink.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

function App() {
  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe.user.id;

  const [count, setCount] = useState(0);
  const [countBonus, setCountBonus] = useState(1);
  const [countTrueMax, setcountTrueMax] = useState(1000);
  const [countTrueBonus, setCountTrueBonus] = useState(1);
  const [levelMoreClicks, setLevelMoreClicks] = useState(0);
  const [levelMoreEnergy, setLevelMoreEnergy] = useState(0);
  const [levelTgChannel1, setLevelTgChannel1] = useState(0);
  const [levelTgPremium, setlevelTgPremium] = useState(0);
  const [levelMoreCountTrueBonus, setLevelMoreCountTrueBonus] = useState(0);
  const [levelFactoryShoes, setLevelFactoryShoes] = useState(0);
  const [levelFactoryHotel, setLevelFactoryHotel] = useState(0);
  const [levelFactoryBank, setLevelFactoryBank] = useState(0);
  const [levelJoinGame, setLevelJoinGame] = useState(0);
  const [countTrue, setCountTrue] = useState(1000);
  const [canClick, setCanClick] = useState(true);
  const [priceMoreClicks, setPriceMoreClicks] = useState(1000);
  const [priceMoreEnergy, setPriceMoreEnergy] = useState(2000);
  const [priceMoreCountTrueBonus, setPriceMoreCountTrueBonus] = useState(3000);
  const [priceFactoryShoes, setPriceFactoryShoes] = useState(5000);
  const [priceFactoryHotel, setPriceFactoryHotel] = useState(10000);
  const [priceFactoryBank, setPriceFactoryBank] = useState(100000)
  const [factoryBonus, setFactoryBonus] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (countTrue < countTrueMax) {
        setCountTrue((prevCount) => prevCount + countTrueBonus);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [countTrue]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (factoryBonus > 0) {
        setCount((prevCount) => prevCount + factoryBonus)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);
  


  const handleClick = () => {
    if (canClick) {
      setCount(count + countBonus);
      if (true) {
        const hapticFeedbackLight = tg.HapticFeedback.impactOccurred("light");
      }

      if (countTrue > 0) {
        setCountTrue(Math.max(countTrue - 1, 0));
      }

      setCanClick(false);
      setTimeout(() => {
        setCanClick(true);
      }, 1);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      console.log("Connected to the internet");
    };

    const handleOffline = () => {
      alert("No connection network");
      window.location.reload(); 
    };

    // Добавляем обработчики событий
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Проверка начального состояния
    if (!navigator.onLine) {
      alert("No connection network");
      window.location.reload(); 

    }

    // Убираем обработчики событий при размонтировании компонента
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (countTrue === 0) {
      const HapticFeedbackError =
        tg.HapticFeedback.notificationOccurred("warning");
      alert("Scrooge is tired... 😴");
    }
  }, [countTrue]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных (можете заменить этот setTimeout на реальную логику загрузки)
    setTimeout(() => {
      setLoading(false); // После завершения загрузки устанавливаем loading в false
    }, 3000); // Пример: имитация загрузки в течение 3 секунд

    // Здесь можно добавить логику для загрузки данных с сервера или другие операции
  }, []);

  //Boosts
  
  const moreClicks = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelMoreClicks === 10) {
      alert("Max level 🔝");
    } else {
      if (
        window.confirm("Here you can buy more clicks in one click 🤑.\nBuy it?")
      ) {
        if (count >= priceMoreClicks) {
          setCount(count - priceMoreClicks);
          setCountBonus(countBonus + 1);
          setLevelMoreClicks(levelMoreClicks + 1);
          setPriceMoreClicks(priceMoreClicks + 1000)
          alert("Thanks for the purchase ✅");
        } else {
          alert("Insufficient funds ❌");
        }
      }
    }
  };

  
  const moreEnergy = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelMoreEnergy === 7) {
      alert("Max level 🔝");
    } else {
      if (window.confirm("Here you can buy more energy.\nBuy it?")) {
        if (count >= priceMoreEnergy) {
          setCount(count - priceMoreEnergy);
          setCountTrue(countTrue + 1000);
          setcountTrueMax(countTrueMax + 1000);
          setLevelMoreEnergy(levelMoreEnergy + 1);
          setPriceMoreEnergy(priceMoreEnergy + 1000)
          alert("Thanks for the purchase ✅");
        } else {
          alert("Insufficient funds ❌");
        }
      }
    }
  };

  const MoreCountTrueBonus = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelMoreCountTrueBonus === 10) {
      alert("Max level 🔝");
    } else {
      if (
        window.confirm("Here you can buy more energy to be charged.\nBuy it?")
      ) {
        if (count >= priceMoreCountTrueBonus) {
          setCount(count - priceMoreCountTrueBonus);
          setCountTrueBonus(countTrueBonus + 1);
          setLevelMoreCountTrueBonus(levelMoreCountTrueBonus + 1);
          setPriceMoreCountTrueBonus(priceMoreCountTrueBonus + 2000);
          alert("Thanks for the purchase ✅");
        } else {
          alert("Insufficient funds ❌");
        }
      }
    }
  };

  
  const FactoryShoes = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelFactoryShoes === 5) {
      alert("Max level 🔝");
    } else {
      if (
        window.confirm(
          "By buying a shoe factory, you will receive +1 coins every 10 seconds.\nBuy it?"
        )
      ) {
        if (count >= priceFactoryShoes) {
          setCount(count - priceFactoryShoes);
          setLevelFactoryShoes(levelFactoryShoes + 1);
          setFactoryBonus(factoryBonus + 1);
          setPriceFactoryShoes(priceFactoryShoes + 1000);
        } else {
          alert("Insufficient funds ❌");
        }
      }
    }
  };

  const FactoryHotel = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelFactoryHotel === 5) {
      alert("Max level 🔝");
    } else {
      if (
        window.confirm(
          "By buying a shoe factory, you will receive +2 coins every 1 seconds.\nBuy it?"
        )
      ) {
        if (count >= priceFactoryHotel) {
          setCount(count - priceFactoryHotel);
          setLevelFactoryHotel(levelFactoryHotel + 1);
          setFactoryBonus(factoryBonus + 2);
          setPriceFactoryHotel(priceFactoryHotel + 1000);
        } else {
          alert("Insufficient funds ❌");
        }
      }
    }
  };

  const FactoryBank = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelFactoryBank === 5) {
      alert("Max level 🔝");
    } else {
      if (
        window.confirm(
          "By buying a shoe factory, you will receive +5 coins every 1 seconds.\nBuy it?"
        )
      ) {
        if (count >= priceFactoryBank) {
          setCount(count - priceFactoryBank);
          setLevelFactoryBank(levelFactoryBank + 1);
          setFactoryBonus(factoryBonus + 1);
          setPriceFactoryBank(priceFactoryBank + 1000);
        } else {
          alert("Insufficient funds ❌");
        }
      }
    }
  };

  

  //Tasks

  const JoinGame = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelJoinGame === 1) {
      alert("You have already completed this task ✅");
    } else {
      setLevelJoinGame(levelJoinGame + 1)
      setCount(count + 10000)
      alert("Welcome to the game!!! You get +10000 coins. 🎁");
    }
  }

  const TgPremium = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelTgPremium === 1) {
      alert("You have already completed this task ✅");
    } else {
      if (
        window.confirm(
          "If you have Telegram premium you get +20,000 coins.\nTo execute?"
        )
      ) {
        if (tg.initDataUnsafe.user.is_premium) {
          setCount(count + 20000);
          setlevelTgPremium(levelTgPremium + 1);
          alert("Yoooo!\nCongratulations on buying TG Premium! ⭐️");
        } else {
          alert("Sorry, but you don't have tg premium 😔");
        }
      }
    }
  };

  const TgChannel1 = () => {
    const hapticFeedbackSoft = tg.HapticFeedback.impactOccurred("soft");
    if (levelTgChannel1 === 1) {
      alert("You have already completed this task ✅");
    } else {
      //тут должна быть проверка
      if (false) {
        //здесь вместо false должен быть вывод проверки
        setCount(count + 20000);
        setLevelTgChannel1(levelTgChannel1 + 1);
        alert("You are subscribed to the channel! ✅");
      } else {
        if (
          window.confirm(
            "If you subscribe to the TG channel, you get +10,000 coins. To execute?"
          )
        ) {
          tg.openTelegramLink("https://t.me/deanon_team_blog");
        } 
      }
      
    }
  }

  
  


  return (
    <div className="App">
      {loading ? (
        <div className="Loading-page">
          <h1 className="title">
            Welcome
            <br />
            Quack Coin!
          </h1>
          <img
            className="loading-wheel"
            src="https://printhiegprog.github.io/loading-wheel.png"
            alt="loading-wheel"
          />
          <div className="contact"></div>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  count={count}
                  handleClick={handleClick}
                  countTrue={countTrue}
                  canClick={canClick}
                />
              }
            />
            <Route
                path="/boost"
                element={
                  <Boost
                    count={count}
                    moreClicks={moreClicks}
                    priceMoreClicks={priceMoreClicks}
                    levelMoreClicks={levelMoreClicks}
                    moreEnergy={moreEnergy}
                    priceMoreEnergy={priceMoreEnergy}
                    levelMoreEnergy={levelMoreEnergy}
                    MoreCountTrueBonus={MoreCountTrueBonus}
                    levelMoreCountTrueBonus={levelMoreCountTrueBonus}
                    priceMoreCountTrueBonus={priceMoreCountTrueBonus}
                    FactoryShoes={FactoryShoes}
                    priceFactoryShoes={priceFactoryShoes}
                    levelFactoryShoes={levelFactoryShoes}
                    FactoryHotel={FactoryHotel}
                    priceFactoryHotel={FactoryHotel}
                    levelFactoryHotel={levelFactoryHotel}
                    FactoryBank={FactoryBank}
                    priceFactoryBank={priceFactoryBank}
                    levelFactoryBank={levelFactoryBank}
                />
              }
            />
            <Route
              path="/task"
                element={<Task JoinGame={JoinGame} TgPremium={TgPremium} TgChannel1={TgChannel1} />}
            />
            <Route path="/link" element={<RefLink userId={userId} />} />
          </Routes>
          <NavBar />
        </Router>
      )}
    </div>
  );
}

export default App;
