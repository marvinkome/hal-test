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
  LinkBox,
  LinkOverlay,
  IconButton,
} from "@chakra-ui/react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { useWatchList } from "hooks/use-watchlist";
import { GRAPHQL_ENDPOINT } from "config";
import { formatCurrency, formatNumber, getLogoUrl } from "libs/utils";

const SavedPools = () => {
  let MAX_ITEMS = 5;

  const watchlist = useWatchList();

  const [activePage, setActivePage] = React.useState(0);
  const [maxPage, setMaxPage] = React.useState(0);

  const { isLoading, isError, data } = useQuery({
    keepPreviousData: true,
    queryKey: ["pool-watchlist", watchlist.items],
    queryFn: async () => {
      const query = `
        {
          pools(where: { id_in: [${[...watchlist.items.map((p) => `"${p}"`)]}] }, orderBy: totalValueLockedUSD, orderDirection: desc) {
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

  React.useEffect(() => {
    if (data?.pools.length) {
      let extraPage = data?.pools.length % MAX_ITEMS === 0 ? 0 : 1;
      setMaxPage(Math.floor(data?.pools.length / MAX_ITEMS) + extraPage);
    }
  }, [data?.pools.length, MAX_ITEMS]);

  const activeData = React.useMemo(() => {
    if (!data) return [];

    const multiplier = MAX_ITEMS * activePage;
    return data?.pools.slice(multiplier, MAX_ITEMS + multiplier);
  }, [data, activePage, MAX_ITEMS]);

  if (isError) {
    return <Text color="rgb(0 0 0 / 70%)">Error loading saved pools</Text>;
  }

  if (isLoading || !data) {
    return <Text color="rgb(0 0 0 / 70%)">Loading saved pools...</Text>;
  }

  if (data?.pools.length === 0) {
    return <Text color="rgb(0 0 0 / 70%)">Your saved pool will appear here</Text>;
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
      {activeData.map((pool: any) => (
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
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="prev-list"
          colorScheme="purple"
          icon={<GrLinkPrevious />}
          isDisabled={activePage === 0}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Text color="rgb(0 0 0 / 65%)" fontSize="sm">
          Page {activePage + 1} of {maxPage}
        </Text>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="next-list"
          colorScheme="purple"
          icon={<GrLinkNext />}
          isDisabled={activePage + 1 === maxPage}
          onClick={() => setActivePage(activePage + 1)}
        />
      </Stack>
    </Stack>
  );
};

const AllPools = () => {
  let MAX_ITEMS = 10;

  const [activePage, setActivePage] = React.useState(0);
  const [maxPage, setMaxPage] = React.useState(0);

  const { isLoading, isError, data } = useQuery({
    keepPreviousData: true,
    queryKey: ["pools"],
    queryFn: async () => {
      const query = `
        {
          pools(first: 100, orderBy: totalValueLockedUSD, orderDirection: desc) {
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

  React.useEffect(() => {
    if (data?.pools.length) {
      let extraPage = data?.pools.length % MAX_ITEMS === 0 ? 0 : 1;
      setMaxPage(Math.floor(data?.pools.length / MAX_ITEMS) + extraPage);
    }
  }, [data?.pools.length, MAX_ITEMS]);

  const activeData = React.useMemo(() => {
    if (!data) return [];

    const multiplier = MAX_ITEMS * activePage;
    return data?.pools.slice(multiplier, MAX_ITEMS + multiplier);
  }, [data, activePage, MAX_ITEMS]);

  if (isError) {
    return <Text>Error loading pools, please refresh the page</Text>;
  }

  if (isLoading || !data) {
    return <Text>Loading pools...</Text>;
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
      {activeData.map((pool: any) => (
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
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="prev-list"
          colorScheme="purple"
          icon={<GrLinkPrevious />}
          isDisabled={activePage === 0}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Text color="rgb(0 0 0 / 65%)" fontSize="sm">
          Page {activePage + 1} of {maxPage}
        </Text>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="next-list"
          colorScheme="purple"
          icon={<GrLinkNext />}
          isDisabled={activePage + 1 === maxPage}
          onClick={() => setActivePage(activePage + 1)}
        />
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
            <SavedPools />
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
