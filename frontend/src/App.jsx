import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Games from "./pages/Games";
import Wallet from "./pages/Wallet";
import Recovery from "./pages/Recovery";
import Settings from "./pages/Settings";

import Mines from "./pages/Mines";
import Crash from "./pages/Crash";
import Plinko from "./pages/Plinko";
import Slots from "./pages/Slot";
import Mystery from "./pages/Mystery";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import GameProtectedRoute from "./components/auth/GameProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/create-account"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <Transactions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/games"
                    element={
                        <ProtectedRoute>
                            <Games />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/wallet"
                    element={
                        <ProtectedRoute>
                            <Wallet />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recovery"
                    element={
                        <ProtectedRoute>
                            <Recovery />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mines"
                    element={
                        <ProtectedRoute>
                            <GameProtectedRoute>
                                <Mines />
                            </GameProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/crash"
                    element={
                        <ProtectedRoute>
                            <GameProtectedRoute>
                                <Crash />
                            </GameProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/plinko"
                    element={
                        <ProtectedRoute>
                            <GameProtectedRoute>
                                <Plinko />
                            </GameProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/slots"
                    element={
                        <ProtectedRoute>
                            <GameProtectedRoute>
                                <Slots />
                            </GameProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mystery"
                    element={
                        <ProtectedRoute>
                            <GameProtectedRoute>
                                <Mystery />
                            </GameProtectedRoute>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;