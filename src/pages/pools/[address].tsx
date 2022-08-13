import NextLink from "next/link";
import {
  chakra,
  Container,
  Button,
  Link,
  Stack,
  Avatar,
  AvatarGroup,
  Heading,
  Icon,
  Text,
  Grid,
  GridItem,
  IconButton,
  LinkBox,
  LinkOverlay,
  StackDivider,
  Select,
} from "@chakra-ui/react";
import { GrFormPreviousLink, GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { HiStar } from "react-icons/hi";

const Page = () => {
  return (
    <Container maxW="container.lg" py={12}>
      {/* back button */}
      <NextLink href="/" passHref>
        <Button variant="link" as={Link} leftIcon={<GrFormPreviousLink />}>
          Back to pools
        </Button>
      </NextLink>

      <Stack direction={{ base: "column", md: "row" }} mt={4} alignItems={{ md: "center" }} spacing={4} justifyContent="space-between">
        <Stack direction="row" spacing={4} alignItems="center">
          <AvatarGroup size={{ base: "sm", md: "md" }} max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          </AvatarGroup>

          <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }}>
            USDC/ETH
          </Heading>
        </Stack>

        <chakra.div>
          <Button lineHeight="1" leftIcon={<Icon as={HiStar} />}>
            Add to watchlist
          </Button>
        </chakra.div>
      </Stack>

      <Stack mt={{ base: 8, md: 6 }} spacing={4} w="fit-content" direction={{ base: "column", md: "row" }}>
        <Stack alignItems="center" direction="row" shadow="base" bgColor="whiteAlpha.800" px={4} py={2} rounded="xl">
          <Avatar size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Text fontWeight="600" fontSize="sm">
            1 USDC = $1.05
          </Text>
        </Stack>

        <Stack alignItems="center" direction="row" shadow="base" bgColor="whiteAlpha.800" px={4} py={2} rounded="xl">
          <Avatar size="xs" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Text fontWeight="600" fontSize="sm">
            1 ETH = $5045.35
          </Text>
        </Stack>

        <Stack alignItems="center" direction="row" shadow="base" bgColor="whiteAlpha.800" px={4} py={2} rounded="xl">
          <Text fontWeight="600" fontSize="sm">
            TX Count: 450
          </Text>
        </Stack>
      </Stack>

      <Stack mt={8} spacing={4}>
        <Stack direction="row" alignItems="center" spacing={4} justify={{ base: "space-between", md: "flex-start" }}>
          <Heading color="rgb(0 0 0 / 80%)" fontWeight="600" fontSize="xl">
            Transactions
          </Heading>

          <Select w="auto" size="sm" rounded="lg" placeholder="Select option">
            <option value="all">All</option>
            <option value="swaps">Swaps</option>
            <option value="adds">Adds</option>
            <option value="removes">Removes</option>
          </Select>
        </Stack>

        <Stack shadow="base" bgColor="whiteAlpha.800" px={4} py={4} rounded="xl" divider={<StackDivider borderColor="rgb(0 0 0 / 5%)" />}>
          {/* header */}
          <Grid gap={4} templateColumns={{ base: "2.5fr repeat(1, 1fr)", md: "3.5fr repeat(3, 1fr)" }} alignItems="center">
            <GridItem>
              <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                Link to Etherscan
              </Text>
            </GridItem>

            <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
              <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                TX Type
              </Text>
            </GridItem>

            <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
              <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                Token Amount
              </Text>
            </GridItem>

            <GridItem display="flex" justifyContent="center">
              <Text fontSize="sm" color="rgb(0 0 0 / 65%)">
                Timestamp
              </Text>
            </GridItem>
          </Grid>

          {/* body */}
          {Array.from({ length: 10 }).map((_, idx) => (
            <LinkBox
              as={Grid}
              key={idx}
              alignItems="center"
              gap={4}
              templateColumns={{ base: "2.5fr repeat(1, 1fr)", md: "3.5fr repeat(3, 1fr)" }}
              _hover={{ opacity: ".6" }}
            >
              <GridItem color="" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                <NextLink href="https://etherscan.io/tx/0x2f93dd56cd9caec9146ffd55c02ce8739117c97cf3e713ca288c20682bc1c252" passHref>
                  <LinkOverlay target="_blank">
                    https://etherscan.io/tx/0x2f93dd56cd9caec9146ffd55c02ce8739117c97cf3e713ca288c20682bc1c252
                  </LinkOverlay>
                </NextLink>
              </GridItem>

              <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
                <Text>Swap</Text>
              </GridItem>

              <GridItem display={{ base: "none", md: "flex" }} justifyContent="center">
                <Text>10.5k USDC</Text>
              </GridItem>

              <GridItem display="flex" justifyContent="center">
                <Text>14 mins ago</Text>
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
    </Container>
  );
};

export default Page;
