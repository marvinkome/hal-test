import { Container, Stack, Heading, Text, StackDivider, Grid, GridItem, Avatar, AvatarGroup, IconButton } from "@chakra-ui/react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const Page = () => {
  return (
    <Container maxW="container.lg" py={12}>
      <Stack>
        {/* watch list */}
        {/* all pools */}
        <Stack spacing={4}>
          <Heading fontSize="2xl">All Pools</Heading>

          <Stack shadow="base" bgColor="whiteAlpha.800" px={4} py={4} rounded="xl" divider={<StackDivider borderColor="rgb(0 0 0 / 5%)" />}>
            {/* header */}
            <Grid templateColumns="3.5fr repeat(3, 1fr)" alignItems="center">
              <GridItem>
                <Text color="rgb(0 0 0 / 65%)">Pool</Text>
              </GridItem>

              <GridItem display="flex" justifyContent="center">
                <Text color="rgb(0 0 0 / 65%)">TX Count</Text>
              </GridItem>

              <GridItem display="flex" justifyContent="center">
                <Text color="rgb(0 0 0 / 65%)">TVL (USD)</Text>
              </GridItem>

              <GridItem display="flex" justifyContent="center">
                <Text color="rgb(0 0 0 / 65%)">Volume (USD)</Text>
              </GridItem>
            </Grid>

            {/* body */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <Grid key={idx} templateColumns="3.5fr repeat(3, 1fr)" alignItems="center">
                <GridItem as={Stack} direction="row" spacing={2} alignItems="center">
                  <AvatarGroup size="sm" max={2}>
                    <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                  </AvatarGroup>
                  <Text>USDC/ETH</Text>
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                  <Text>16</Text>
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                  <Text>$234.56m</Text>
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                  <Text>$45m</Text>
                </GridItem>
              </Grid>
            ))}

            {/* footer */}
            <Stack direction="row" alignItems="center" justifyContent="center" pt={2} spacing={4}>
              <IconButton variant="ghost" size="sm" aria-label="prev-list" icon={<GrLinkPrevious />} />
              <Text fontSize="sm">Page 1 of 234</Text>
              <IconButton variant="ghost" size="sm" aria-label="next-list" icon={<GrLinkNext />} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Page;
