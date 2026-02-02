import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Testimonial, FoodGallery, RestaurantInfo, Contact, Reservation } from '../backend';

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFoodGalleries() {
  const { actor, isFetching } = useActor();

  return useQuery<FoodGallery[]>({
    queryKey: ['foodGalleries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFoodGalleries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRestaurantInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<RestaurantInfo>({
    queryKey: ['restaurantInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getRestaurantInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addContact(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useAddReservation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; date: bigint; tableSize: bigint; notes: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addReservation(data.name, data.email, data.date, data.tableSize, data.notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}
