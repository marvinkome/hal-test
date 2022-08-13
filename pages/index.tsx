import {
  Container,
  Stack,
  Heading,
  Text,
  StackDivider,
  Grid,
  GridItem,
  Avatar,
  AvatarGroup,
  IconButton,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import NextLink from "next/link";

const Page = () => {
  return (
    <Container maxW="container.lg" py={12}>
      <Stack spacing={10}>
        {/* watch list */}
        <Stack spacing={4}>
          <Heading color="rgb(0 0 0 / 80%)" fontWeight="600" fontSize={{ base: "lg", md: "xl" }}>
            Pool Watchlist
          </Heading>

          <Stack shadow="base" bgColor="whiteAlpha.800" px={4} py={4} rounded="xl" divider={<StackDivider borderColor="rgb(0 0 0 / 5%)" />}>
            <Text color="rgb(0 0 0 / 70%)">Your saved pool will appear here</Text>
          </Stack>
        </Stack>

        {/* all pools */}
        <Stack spacing={4}>
          <Heading color="rgb(0 0 0 / 80%)" fontWeight="600" fontSize={{ base: "lg", md: "xl" }}>
            All Pools
          </Heading>

          <Stack shadow="base" bgColor="whiteAlpha.800" px={4} py={4} rounded="xl" divider={<StackDivider borderColor="rgb(0 0 0 / 5%)" />}>
            {/* header */}
            <Grid templateColumns={{ base: "2.5fr repeat(1, 1fr)", md: "3.5fr repeat(3, 1fr)" }} alignItems="center">
              <GridItem>
                <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                  Pool
                </Text>
              </GridItem>

              <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
                <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                  TX Count
                </Text>
              </GridItem>

              <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
                <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                  TVL (USD)
                </Text>
              </GridItem>

              <GridItem display="flex" justifyContent="center">
                <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                  Volume (USD)
                </Text>
              </GridItem>
            </Grid>

            {/* body */}
            {Array.from({ length: 10 }).map((_, idx) => (
              <LinkBox
                as={Grid}
                key={idx}
                templateColumns={{ base: "2.5fr repeat(1, 1fr)", md: "3.5fr repeat(3, 1fr)" }}
                alignItems="center"
                _hover={{ opacity: ".65" }}
              >
                <GridItem as={Stack} direction="row" spacing={2} alignItems="center">
                  <AvatarGroup size="sm" max={2}>
                    <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                  </AvatarGroup>

                  <NextLink href="/pools/hello" passHref>
                    <LinkOverlay>USDC/ETH</LinkOverlay>
                  </NextLink>
                </GridItem>

                <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
                  <Text>16</Text>
                </GridItem>

                <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
                  <Text>$234.56m</Text>
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                  <Text>$45m</Text>
                </GridItem>
              </LinkBox>
            ))}

            {/* footer */}
            <Stack direction="row" alignItems="center" justifyContent="center" pt={2} spacing={4}>
              <IconButton variant="ghost" size="sm" aria-label="prev-list" icon={<GrLinkPrevious />} />
              <Text color="rgb(0 0 0 / 65%)" fontSize="sm">
                Page 1 of 234
              </Text>
              <IconButton variant="ghost" size="sm" aria-label="next-list" icon={<GrLinkNext />} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Page;
