import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddReservation } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReservationDialog({ open, onOpenChange }: ReservationDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    tableSize: '',
    notes: '',
  });

  const addReservation = useAddReservation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateTimestamp = BigInt(new Date(formData.date).getTime() * 1_000_000);
      await addReservation.mutateAsync({
        name: formData.name,
        email: formData.email,
        date: dateTimestamp,
        tableSize: BigInt(formData.tableSize),
        notes: formData.notes,
      });
      toast.success('Reservation request sent successfully! We will confirm shortly.');
      setFormData({ name: '', email: '', date: '', tableSize: '', notes: '' });
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to send reservation. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-slate-900 to-emerald-950 border-emerald-400/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
            Reserve a Table
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in your details and we'll confirm your reservation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="res-name">Name</Label>
            <Input
              id="res-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white/5 border-white/20 text-white"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="res-email">Email</Label>
            <Input
              id="res-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-white/5 border-white/20 text-white"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="res-date">Date & Time</Label>
            <Input
              id="res-date"
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="bg-white/5 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="res-size">Number of Guests</Label>
            <Input
              id="res-size"
              type="number"
              min="1"
              max="20"
              value={formData.tableSize}
              onChange={(e) => setFormData({ ...formData, tableSize: e.target.value })}
              required
              className="bg-white/5 border-white/20 text-white"
              placeholder="2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="res-notes">Special Requests (Optional)</Label>
            <Textarea
              id="res-notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-white/5 border-white/20 text-white resize-none"
              placeholder="Any special requirements..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={addReservation.isPending}
            className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600"
          >
            {addReservation.isPending ? 'Submitting...' : 'Confirm Reservation'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
