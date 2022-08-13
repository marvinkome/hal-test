import React from "react";
import NextLink from "next/link";
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
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { GRAPHQL_ENDPOINT } from "config";
import { formatCurrency, formatNumber, getLogoUrl } from "libs/utils";

let MAX_ITEMS = 10;

const AllPools = () => {
  const [activePage, setActivePage] = React.useState(0);
  const { isLoading, isError, data, isFetching } = useQuery({
    keepPreviousData: true,
    queryKey: ["pools", activePage],
    queryFn: async () => {
      const query = `
        {
          pools(first: 10, skip: ${10 * activePage}, orderBy: totalValueLockedUSD, orderDirection: desc) {
            id
            txCount
            totalValueLockedUSD
            volumeUSD
            token0 {
              id
              symbol
            }
            token1 {
              id
              symbol
            }
          }
        }
      `;

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const { data, errors } = await response.json();
      if (errors && errors[0]) {
        throw new Error(errors[0].message);
      }

      return data;
    },
  });

  if (isLoading || !data) {
    return <Text>Loading pools...</Text>;
  }

  if (isError) {
    return <Text>Error loading pools, please refresh the page</Text>;
  }

  return (
    <Stack divider={<StackDivider borderColor="rgb(0 0 0 / 4%)" />}>
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
            TVL
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="center">
          <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
            Volume
          </Text>
        </GridItem>
      </Grid>

      {/* body */}
      {data?.pools.map((pool: any) => (
        <LinkBox
          as={Grid}
          key={pool.id}
          templateColumns={{ base: "2.5fr repeat(1, 1fr)", md: "3.5fr repeat(3, 1fr)" }}
          alignItems="center"
          _hover={{ fontWeight: "600" }}
        >
          <GridItem as={Stack} direction="row" spacing={3} alignItems="center">
            <AvatarGroup size="sm" max={2}>
              <Avatar name={pool.token0.symbol} src={getLogoUrl(pool.token0.id)} />
              <Avatar name={pool.token1.symbol} src={getLogoUrl(pool.token1.id)} />
            </AvatarGroup>

            <NextLink href={`/pools/${pool.id}`} passHref>
              <LinkOverlay>
                {pool.token0.symbol}/{pool.token1.symbol}
              </LinkOverlay>
            </NextLink>
          </GridItem>

          <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
            <Text>{formatNumber(pool.txCount)}</Text>
          </GridItem>

          <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
            <Text>{formatCurrency(pool.totalValueLockedUSD)}</Text>
          </GridItem>

          <GridItem display="flex" justifyContent="center">
            <Text>{formatCurrency(pool.volumeUSD)}</Text>
          </GridItem>
        </LinkBox>
      ))}

      {/* footer */}
      <Stack direction="row" alignItems="center" justifyContent="center" pt={2} spacing={4}>
        {data && isFetching ? (
          <CircularProgress isIndeterminate size="32px" color="gray.400" />
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              aria-label="prev-list"
              isLoading={isFetching}
              leftIcon={<GrLinkPrevious />}
              isDisabled={activePage === 0}
              onClick={() => setActivePage(activePage - 1)}
            >
              Prev
            </Button>
            <Button
              isLoading={isFetching}
              variant="ghost"
              size="sm"
              aria-label="next-list"
              rightIcon={<GrLinkNext />}
              onClick={() => setActivePage(activePage + 1)}
            >
              Next
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

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

          <Stack shadow="base" bgColor="whiteAlpha.800" px={4} py={4} rounded="xl">
            <AllPools />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Page;
