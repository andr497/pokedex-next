"use client";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { fetchPokemonList } from "api/pokemon";
import { WindowScroller } from "react-virtualized/dist/es/WindowScroller";

import { IPokemonList } from "interfaces/IPokemonList";
import { Loader, Rectangular } from "@/components/Skeleton";
import { pokemonListState, searchTextPokemonState } from "@/recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import ListRowWrapper from "@/components/ListRowWrapper";
import useBreakpoints from "hooks/useBreakpoints";

import { getAllPokemonTypes } from "api/types";

import { InformationCircleIcon as ErrorIcon } from "@heroicons/react/20/solid";
import SelectTypePokemon from "@/components/Select/SelectTypePokemon";
import { NamedAPIResourceWithId } from "interfaces/PokeApi/CommonModels";