import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/signup";
    const body = { email, password };

    try {
      const res = await fetch(`https://backengine-wt90.fly.dev${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        if (isLogin) {
          const data = await res.json();
          localStorage.setItem("accessToken", data.accessToken);
          toast({
            title: "Logged in",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Account created",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLogin(true);
        }
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      toast({
        title: "An error occurred",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
        <Heading mb={6} textAlign="center">
          {isLogin ? "Login" : "Sign Up"}
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Stack>
        </form>
        <Box mt={4} textAlign="center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
